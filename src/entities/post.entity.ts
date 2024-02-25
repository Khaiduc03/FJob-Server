import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base';
import { Category } from './category.entity';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity({
    name: 'Post',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Post extends Base {
    @Expose()
    @OneToMany(() => User, (user) => user.uuid)
    owner: User;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    title: string;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    description: string;

    @Expose()
    @OneToOne(() => Image, (image) => image.uuid)
    @JoinColumn()
    image: Image;

    @Expose()
    @Column({ type: 'int', default: 0 })
    favorite: number;

    @Expose()
    @ManyToOne(() => Category, (category) => category.uuid)
    category: Category;

    constructor(post: Partial<Post>) {
        super();
        if (post) {
            Object.assign(
                this,
                plainToClass(Post, post, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = post.uuid || uuids4();
        }
    }
}
