import {PaginationDto} from '../common/dto/pagination.dto';

export interface IBaseCrud<T, R> {
    create(createDto: T): Promise<R>;

    findOne(id: string): Promise<R>;

    findAll(paginationDto: PaginationDto): Promise<R[]>;

    update(id: string, updateDto: T): Promise<R>;

    remove(id: string): Promise<string>;
}