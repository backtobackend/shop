import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {GlobalModule} from './common/global.module';
import {DatabaseModule} from './database/database.module';
import {OrdersModule} from './orders/orders.module';
import {PaymentModule} from './payment/payment.module';
import {CategoryModule} from './category/category.module';
import {ProductModule} from './product/product.module';
import {AuthModule} from './auth/auth.module';
import {FseService} from './files/storage/fse.service';
import { QueryingModule } from './querying/querying.module';

@Module({
    imports: [GlobalModule, DatabaseModule, UsersModule, OrdersModule, PaymentModule, CategoryModule, ProductModule, AuthModule, QueryingModule],
    controllers: [],
    providers: [FseService],
})
export class AppModule {
}
