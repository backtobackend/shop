import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {IdDTO} from '../common/dto/id.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {ResponseOrderDto} from './dto/response-order.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get('all')
    findAll(@Query() paginationDto: PaginationDto) {
        return this.ordersService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param() {id}: IdDTO): Promise<ResponseOrderDto> {
        return this.ordersService.findOne(id);
    }

    @Patch(':id')
    update(@Param() {id}: IdDTO, @Body() updateOrderDto: UpdateOrderDto) {
        return
    }

    @Delete(':id')
    remove(@Param() {id}: IdDTO) {
        return this.ordersService.remove(id);
    }
}
