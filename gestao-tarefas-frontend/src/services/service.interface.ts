export interface ServiceInterface<T> {

    findAll(): Promise<T[]>;
    find(id: string): Promise<T>;
    create(object: T): Promise<T>;
    update(object: T): Promise<T>;
    delete(id: string): Promise<T>;

}