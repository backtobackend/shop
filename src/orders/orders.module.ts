import {Module} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './entities/order.entity';
import {Product} from '../product/entities/product.entity';
import {OrderItem} from './entities/order-item.entity';
import {ProductModule} from '../product/product.module';
import {QueryingModule} from '../querying/querying.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, OrderItem]), ProductModule, QueryingModule],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {
}
