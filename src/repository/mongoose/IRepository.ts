export interface IRead<T> {
    getAll(): Promise<T[]>
    getById(id: string): Promise<T>
}
  
export interface IWrite<T> {
    add(item: T): Promise<T>
    update(item: T): Promise<T>
    remove(id: string): Promise<boolean>
}
  
export interface IRepository<T> extends IWrite<T>, IRead<T> {}

