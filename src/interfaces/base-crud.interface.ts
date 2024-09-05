export interface IBaseCrud<T, R> {
    create(createDto: T): Promise<R>;

    findOne(id: string): Promise<R>;

    findAll(): Promise<R[]>;

    patch(id: string, updateDto: T): Promise<R>;

    delete(id:string): Promise<string>;
}