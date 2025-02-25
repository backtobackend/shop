export interface PaginationMeta {
    readonly currentPage: number;
    readonly itemsPerPage: number;
    readonly  totalItems: number;
    readonly totalPages: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
}