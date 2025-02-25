import {applyDecorators, ValidationPipeOptions} from '@nestjs/common';
import {IsInt, IsPositive, ValidationOptions} from 'class-validator';

/**
 *
 */
export const IsCardinal = (validationOptions?: ValidationOptions): PropertyDecorator => applyDecorators(IsInt(validationOptions), IsPositive(validationOptions))