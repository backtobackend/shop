import {Injectable} from '@nestjs/common';
import {Between, Equal, ILike, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual} from 'typeorm';
import {FilterOperationDto} from './dto/filter-operation.dto';

@Injectable()
export class FilteringService {
    contain(text: string) {
        if (!text) return
        return ILike(`%${text}%`)
    }

    compare(filterOperationDto: FilterOperationDto) {
        if (!filterOperationDto) return
        const {operators, operands} = filterOperationDto;
        const [firstOperand, secondOperand] = operands;
        switch (operators) {
            case 'lt':
                return LessThan(firstOperand);
            case 'lte':
                return LessThanOrEqual(firstOperand)
            case 'gt':
                return MoreThan(firstOperand)
            case 'gte':
                return MoreThanOrEqual(firstOperand)
            case 'eq':
                return Equal(firstOperand)
            case 'btw':
                return Between(firstOperand, secondOperand)
        }
    }
}