import {Controller, Param, Post} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {IdDTO} from '../common/dto/id.dto';
import {User} from '../auth/decorators/user.decorator';
import {ResponseUserDto} from '../users/dto/response-user.dto';
import {PAYMENT_METHODS} from './services/payment-factory.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {
    }

    @Post(':id')
    async payOrder(@Param() {id}: IdDTO, @User() user: ResponseUserDto) {
        return this.paymentService.payOrder(id, user)
    }
}
