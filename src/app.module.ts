import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {GlobalModule} from './common/global.module';
import {DatabaseModule} from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [GlobalModule, DatabaseModule, UsersModule, OrdersModule, PaymentModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
