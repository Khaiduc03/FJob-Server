import { Expose, plainToClass } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { TypeMessage } from './types';
import { Base } from './base';
import { uuids4 } from 'src/utils';

@Entity({
    name: 'Message',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Message extends Base {
    @Expose()
    @Column({ type: 'varchar', default: '' })
    content: string;

    @Expose()
    @Column({ type: 'string', default: '', length: 10 })
    type: TypeMessage;

    @Expose()
    @ManyToOne(() => User, (user) => user.uuid)
    owner: User;

    @Expose()
    @ManyToOne(() => User, (user) => user.uuid)
    receiver: User;

    constructor(message: Partial<Message>) {
        super();
        if (message) {
            Object.assign(
                this,
                plainToClass(Message, message, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = message.uuid || uuids4();
        }
    }
}
