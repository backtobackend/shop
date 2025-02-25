import {ValidateBy, ValidationArguments} from 'class-validator';
import {FilterOperationDto} from '../dto/filter-operation.dto';

export const Is_Validate_Filter_Operands_Length = 'validateFilterOperandsLength';

/**
 * Checks if value is a valid password.
 */
function validateFilterOperandsLength(args: ValidationArguments): boolean {
    const filterOperationDto = args.object as FilterOperationDto
    switch (filterOperationDto.operators) {
        case 'lt':
            return filterOperationDto.operands.length === 1
        case 'lte':
            return filterOperationDto.operands.length === 1
        case 'gt':
            return filterOperationDto.operands.length === 1
        case 'gte':
            return filterOperationDto.operands.length === 1
        case 'eq':
            return filterOperationDto.operands.length === 1
        case 'btw':
            return filterOperationDto.operands.length === 2
    }
}

/**
 * Checks if value is an valid password.
 */
export function ValidateFilterOperandsLength(): PropertyDecorator {
    return ValidateBy(
        {
            name: Is_Validate_Filter_Operands_Length,
            validator: {
                validate: (value, args): boolean => validateFilterOperandsLength(args),
                defaultMessage: () => 'Operands length is not according to filter operator'
            },
        },
    );
}