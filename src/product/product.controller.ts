import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {IdDTO} from '../common/dto/id.dto';
import {ResponseProductDto} from './dto/response-product.dto';
import {RequireRole} from '../auth/decorators/role.decorator';
import {Role} from '../auth/roles/role.enum';
import {ApiBody, ApiConsumes, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {maxFiles} from '../files/util/files.constant';
import {FileParsePipe} from '../files/util/file-validator';
import {IdFilenameDto} from '../files/dto/id-filename.dto';
import {MULTIPART_FORM_DATA} from '../files/constants/file.constant';
import {FilesSchema} from '../files/swagger/schema/files.schema';
import {FileSchema} from '../files/swagger/schema/file.schema';
import {BodyInterceptor} from '../files/interceptors/body.interceptor.ts/body.interceptor.ts.interceptor';
import {ReturnProductsWithCount} from './interface/ReturnProductsWithCount.interface';
import {ProductQueryDto} from './dto/querying/product-query.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @RequireRole([Role.MANAGER])
    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        return this.productService.create(createProductDto);
    }

    @Get('all')
    findAll(@Query() productQuery:ProductQueryDto): Promise<ReturnProductsWithCount> {
        return this.productService.findAll(productQuery);
    }

    @Get(':id')
    findOne(@Param() {id}: IdDTO) {
        return this.productService.findOne(id);
    }

    @RequireRole([Role.MANAGER])
    @Patch(':id')
    update(@Param() {id}: IdDTO, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @RequireRole([Role.MANAGER])
    @Delete(':id')
    remove(@Param() {id}: IdDTO) {
        return this.productService.remove(id);
    }

    @ApiConsumes(MULTIPART_FORM_DATA)
    @ApiBody({type: FilesSchema})
    @RequireRole([Role.ADMIN])
    @Post(':id/images')
    @UseInterceptors(FilesInterceptor('files', maxFiles.maxFiles), BodyInterceptor)
    uploadFiles(@UploadedFiles(FileParsePipe('3mb', 'image/jpeg', 'image/png', 'application/pdf')
    ) files: Express.Multer.File[], @Param() {id}: IdDTO): Promise<void> {
        return this.productService.uploadFiles(id, files)
    }

    @ApiOkResponse({type: FileSchema})
    @Get(':id/images/:filename')
    downloadFile(@Param() {id, filename}: IdFilenameDto) {
        return this.productService.downloadFile(id, filename);
    }

    @RequireRole([Role.MANAGER])
    @Delete(':id/images/:filename')
    deleteFile(@Param() {id, filename}: IdFilenameDto) {
        return this.productService.deleteFile(id, filename);
    }

    @RequireRole([Role.MANAGER])
    @Delete(':id')
    deleteProduct(@Param() {id}: IdDTO, @Query('soft') soft?: boolean): Promise<string> {
        return this.productService.remove(id, soft);
    }


    @Get('file-names/:directory')
    getDirectoryFileNames(@Param('directory') directory: string): Promise<string[]> {
        return this.productService.getDirFileNames(directory)
    }
}
