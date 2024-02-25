import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { Base } from './base';
import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity({
    name: 'Comment',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Comment extends Base {
    @Expose()
    @ManyToOne(() => Post, (post) => post.uuid)
    post: Post;

    @Expose()
    @OneToOne(() => User, (user) => user.uuid)
    owner: User;

    @Expose()
    @Column({ type: 'varchar', default: '', nullable: false })
    message: string;

    @Expose()
    @Column({ type: 'uuid', default: null })
    parent: string;

    constructor(comment: Partial<Comment>) {
        super();
        if (comment) {
            Object.assign(
                this,
                plainToClass(Comment, comment, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = comment.uuid || uuids4();
        }
    }
}
