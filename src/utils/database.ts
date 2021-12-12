import { getManager, Repository, ObjectType } from 'typeorm'

export default class Database<T> {
    repo: Repository<T>;
    
    constructor(entityClass: ObjectType<T>) {
        this.repo = getManager().getRepository(entityClass);
    }

    async save(entity: T) {
        try {
            await this.repo.save(entity);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async get(filter: object) {
        try {
            return await this.repo.findOne(filter);
        } catch(err) {
            console.log(err);
            return undefined;
        }
    }
}