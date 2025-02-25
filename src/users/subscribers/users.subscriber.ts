import {DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from 'typeorm';
import {User} from '../entity/user.entity';
import {HashService} from '../../auth/hash/hash.service';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
    constructor(private readonly dataSource: DataSource, private readonly hashService: HashService) {
        dataSource.subscribers.push(this)
    }

    listenTo() {
        return User
    }

    async beforeInsert(event: InsertEvent<User>) {
        const {entity} = event
        entity.password = await this.hashService.hash(entity.password)
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        const {entity, databaseEntity: databaseUser} = event
        const user = entity as User
        if (user.password !== databaseUser.password) {
            user.password = await this.hashService.hash(user.password)
        }
    }
}

