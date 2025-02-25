import {PaginationDto} from '../querying/dto/pagination.dto';

export interface IBaseCrud<T, R> {
    create(createDto: T): Promise<R>;

    findOne(id: string): Promise<R>;

    findAll(paginationDto: PaginationDto): Promise<R[]>;

    update(id: string, updateDto: T): Promise<R>;

    // update(id: string, updateDto: T, userId?: string): Promise<R>;

    remove(id: string, soft?: boolean): Promise<string>;

    // remove(id: string, soft?: boolean, userId?: string): Promise<string>;
}