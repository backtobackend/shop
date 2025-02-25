import {ResponseUserDto} from '../../users/dto/response-user.dto';

export interface IPayment<R> {
    payOrder(id: string, user: ResponseUserDto): Promise<R>;
}