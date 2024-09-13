import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {GlobalModule} from './common/global.module';
import {DatabaseModule} from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [GlobalModule, DatabaseModule, UsersModule, OrdersModule, PaymentModule, CategoryModule, ProductModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
