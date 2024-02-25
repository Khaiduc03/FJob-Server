import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Base } from './base';
import { plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';

@Entity({
    name: 'Follower',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Follower extends Base {
    @ManyToOne(() => User, (user) => user.uuid)
    user: User;

    @ManyToOne(() => User, (user) => user.uuid)
    follower: User;

    constructor(follower: Partial<Follower>) {
        super();
        if (follower) {
            Object.assign(
                this,
                plainToClass(Follower, follower, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = follower.uuid || uuids4();
        }
    }
}
