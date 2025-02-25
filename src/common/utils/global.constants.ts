import {ValidationPipeOptions} from '@nestjs/common';

export const GLOBAL_PIPE_OPTION: ValidationPipeOptions = {transform: true, whitelist: true}
