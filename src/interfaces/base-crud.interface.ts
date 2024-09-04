export interface IBaseCrud<T, R> {
    create(createDto: T): Promise<R>;

    patch(updateDto: T): Promise<string>;

    delete(deleteDto: T): Promise<string>;
}