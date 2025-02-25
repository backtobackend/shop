import {plainToInstance, Transform} from 'class-transformer';
import {FilterOperationDto} from '../dto/filter-operation.dto';

let i: number = 0
let dto: FilterOperationDto

const toFilterOperationDto = (value: string) => {
    if (i > 0) {
        return dto
    }
    const [operators, concOperand] = value.split(':');
    const operandsStr = concOperand ? concOperand.split(',') : []
    const operands = operandsStr.map(operand => +operand)
    const plainDto = {operators, operands}
    dto = plainToInstance(FilterOperationDto, plainDto)
    i++
    return dto
}

export const ToFilterOperationDto = () => Transform(({value}) => toFilterOperationDto(value))