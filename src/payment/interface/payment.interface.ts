import {IdDTO} from '../../common/dto/id.dto';

export interface IPayment<R> {
    payOrder(id: string): Promise<R>;
}