import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base';
import { TypeStatus } from './types';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Job } from './job.entity';

@Entity({
    name: 'User_Job',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class User_Job extends Base {
    @Expose()
    @Column({ type: 'varchar', default: 'Application Sent', length: 100 })
    status: TypeStatus;

    @Expose()
    @Column({ type: 'varchar', default: 'cc', length: 100 })
    full_name: string;

    @Expose()
    @Column({ type: 'varchar', default: 'cc', length: 50 })
    email: string;

    @Expose()
    @Column({ type: 'varchar', default: 'cc', length: 200 })
    motivation_letter: string;

    @Expose()
    @OneToOne(() => Image, (image) => image.uuid)
    cv: Image;

    // @Expose()
    // @OneToMany(() => Job, (job) => job.uuid)
    // job: Job;

    @Expose()
    @OneToMany(() => User, (user) => user.uuid)
    owner: User;

    constructor(user_job: Partial<User_Job>) {
        super();
        if (user_job) {
            Object.assign(
                this,
                plainToClass(User_Job, user_job, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = this.uuid || uuids4();
        }
    }
}
