import { plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Entity, ManyToOne } from 'typeorm';

import { Base } from './base';
import { User } from './user.entity';

@Entity({
    name: 'Following',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Following extends Base {
    @ManyToOne(() => User, (user) => user.uuid)
    user: User;

    @ManyToOne(() => User, (user) => user.uuid)
    following: User;

    constructor(following: Partial<Following>) {
        super();
        if (following) {
            Object.assign(
                this,
                plainToClass(Following, following, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = following.uuid || uuids4();
        }
    }
}
