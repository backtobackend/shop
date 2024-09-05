import {ValidationPipeOptions} from '@nestjs/common';

export const GLOBAL_PIPE_OPTION: ValidationPipeOptions = {transform: true, whitelist: true}
export const DEFAULT_PAGE_SIZE = {
    USER: 1,
} as const satisfies Record<string, number>