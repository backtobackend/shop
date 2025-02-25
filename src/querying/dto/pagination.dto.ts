import {IsInt, IsOptional, Max} from 'class-validator';
import {Type} from 'class-transformer';
import {MAX_PAGE_NUMBER, MAX_PAGE_SIZE} from '../util/querying.constant'

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Max(MAX_PAGE_SIZE)
    @Type(() => Number)
    limit?: number
    @IsOptional()
    @IsInt()
    @Max(MAX_PAGE_NUMBER)
    @Type(() => Number)
    page?: number = 1
}