import {PaginationDto} from '../users/dto/pagination.dto';

export interface IBaseCrud<T, R> {
    create(createDto: T): Promise<R>;

    findOne(id: string): Promise<R>;

    findAll(paginationDto: PaginationDto): Promise<R[]>;

    patch(id: string, updateDto: T): Promise<R>;

    delete(id: string): Promise<string>;
}