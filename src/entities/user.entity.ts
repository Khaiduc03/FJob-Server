import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from './base';
import { TypeRole } from './types';
import { Image } from './image.entity';

@Entity({
    name: 'User',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class User extends Base {
    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    nick_name: string;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    full_name: string;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 12 })
    phone_number: string;

    @Expose()
    @Column({ type: 'date', nullable: true })
    dob: Date;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    email: string;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    password: string;

    @Expose()
    @Column({ type: 'int', default: 0 })
    gender: number;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    address: string;

    @Expose()
    @OneToOne(() => Image, (image) => image.uuid)
    avatar: Image;

    @Expose()
    @Column({ type: 'simple-array', default: '{}', array: true })
    role: TypeRole;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    summary: string;

    @Expose()
    @Column({ type: 'bool', default: false })
    status: boolean;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    device_token: string;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    cv: string;

    constructor(user: Partial<User>) {
        super();
        if (user) {
            Object.assign(
                this,
                plainToClass(User, user, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = this.uuid || uuids4();
        }
    }
}
