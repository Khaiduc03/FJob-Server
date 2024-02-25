import { Column, Entity } from 'typeorm';
import { Base } from './base';
import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { TypeCategory } from './types';

@Entity({
    name: 'Category',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Category extends Base {
    @Expose()
    @Column({ type: 'varchar', nullable: false })
    type: TypeCategory;

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    constructor(category: Partial<Base>) {
        super();
        if (category) {
            Object.assign(
                this,
                plainToClass(Category, category, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = category.uuid || uuids4();
        }
    }
}
