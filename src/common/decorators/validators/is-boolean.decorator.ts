import {ValidationOptions} from 'class-validator';
import {applyDecorators} from '@nestjs/common';
import {IsBoolean as DefaultIsBoolean} from 'class-validator';
import {ToBoolean} from '../transformers/to-boolean.decorator';

export const IsBoolean = (validationOptions: ValidationOptions): PropertyDecorator => applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());