import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {IOrderCrud} from './interface/order-crud.interface';
import {ResponseOrderDto} from './dto/response-order.dto';
import {PaginationDto} from '../querying/dto/pagination.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './entities/order.entity';
import {Repository} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {OrderItemDto} from './dto/order-item.dto';
import {OrderItem} from './entities/order-item.entity';
import {ProductService} from '../product/product.service';
import {DEFAULT_PAGE_SIZE} from '../querying/util/querying.constant';
import {PaginationService} from '../querying/pagination.service';

@Injectable()
export class OrdersService implements IOrderCrud {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
                @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
                private productService: ProductService, private paginationService: PaginationService) {
    }

    async create(createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
        const {items} = createOrderDto;
        const itemsWithPrices = await Promise.all(
            items.map(async (item) => await this.createOrderItemWithPrice(item))
        )
        const order = this.orderRepository.create({
            ...createOrderDto,
            items: itemsWithPrices
        })
        const newOrder = await this.orderRepository.save(order);
        itemsWithPrices.map(async (item) => {
            await this.orderItemRepository.save({
                ...item,
                productId: item.product.toString(),
                orderId: newOrder.id
            });
        })
        if (!newOrder) throw new BadRequestException('Order was not created');
        return plainToInstance(ResponseOrderDto, newOrder);
    }

    async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
        const {id} = orderItemDto.product
        const product = await this.productService.findOne(orderItemDto.product.id);
        if (!product) throw new NotFoundException('Product was not found');
        const {price} = product
        const orderItem = this.orderItemRepository.create({...orderItemDto, price})
        console.log('=>(orders.service.ts:53) orderItem', orderItem);
        return orderItem
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseOrderDto[]> {
        const {limit = DEFAULT_PAGE_SIZE.PRODUCT, page} = paginationDto
        const offset = this.paginationService.calculateOffset(page, limit);
        const orders = await this.orderRepository.createQueryBuilder('order').skip(offset).limit(limit).getMany()
        return plainToInstance(ResponseOrderDto, orders)
    }

    async findOne(id: string): Promise<ResponseOrderDto> {
        // const order = await this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.items', 'orderItem').leftJoinAndSelect('order.payment', 'payment').leftJoinAndSelect('order.user', 'user').where('order.id = :id ', {id}).getOne()
        const order = await this.orderRepository.findOneOrFail({where: {id}});
        console.log('=>(orders.service.ts:68) order', order);
        return plainToInstance(ResponseOrderDto, order)
    }

    async update(id: string, updateDto: UpdateOrderDto): Promise<ResponseOrderDto> {
        // const order = await this.orderRepository.createQueryBuilder('order').where('order.id = :id', {id}).getOne()
        // if (!order) throw new NotFoundException('Order was not found');
        // const updated = await this.orderRepository.createQueryBuilder().update(Order).set(updateDto).where('id = :id', {id}).execute()
        // if (updated.affected < 1) throw new BadRequestException('Order was not updated');
        return
    }

    async remove(id: string): Promise<string> {
        const order = await this.orderRepository.createQueryBuilder('order').where('order.id = :id', {id}).getOne()
        if (!order) throw new NotFoundException('Order was not found');
        const deleted = await this.orderRepository.createQueryBuilder().delete().from(Order).where('id = :id', {id}).execute()
        if (deleted.affected < 1) throw new BadRequestException('Order was not deleted');
        return `category ${order.id} was deleted`;
    }
}
