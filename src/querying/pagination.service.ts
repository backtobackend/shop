import {Injectable} from '@nestjs/common';
import {PaginationMeta} from './interfaces/pagination-meta.interface';

@Injectable()
export class PaginationService {

    calculateOffset(page: number, pageSize: number): number {
        return page * pageSize - pageSize
    }

    createMeta(limit: number, currentPage: number, count: number): PaginationMeta {
        const totalPages = Math.ceil(count / limit)
        if (currentPage > totalPages) return
        const hasNextPage = currentPage < totalPages
        const hasPreviousPage = currentPage > 1
        return {currentPage, itemsPerPage: limit, totalItems: count, totalPages, hasPreviousPage, hasNextPage}
    }
}
