import {IsOptional, IsUUID, ValidateNested} from 'class-validator';
import {NameFilterDto} from '../../../querying/dto/name-filter.dto';
import {ToFilterOperationDto} from '../../../querying/decorators/to-filter-operation-dto.decorator';
import {FilterOperationDto} from '../../../querying/dto/filter-operation.dto';

export class ProductFilterDto extends NameFilterDto {
    @IsOptional()
    @ValidateNested()
    @ToFilterOperationDto()
    // TODO price is a query string so it will be transformed to FilterOperationDto after that it will be validated by ValidateNested
    readonly price?: FilterOperationDto
    @IsOptional()
    @IsUUID()
    readonly categoryId?: string
}