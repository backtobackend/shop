import {IsNotEmpty, IsNumber} from 'class-validator';
import {ValidateFilterOperandsLength} from '../decorators/validate-operands-length.decorator';

type Operators = 'lt' | 'lte' | 'gt' | 'gte' | 'btw' | 'eq';

export class FilterOperationDto {
    @IsNotEmpty()
    readonly operators: Operators;

    @IsNumber({}, {each: true})
    readonly operands: number[];

    @ValidateFilterOperandsLength()
    private readonly manyFieldValidation: any;
}