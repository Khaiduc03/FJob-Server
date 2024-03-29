import { Column, Entity } from 'typeorm';
import { Base } from './base';
import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';

@Entity({
    name: 'Image',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Image extends Base {
    @Expose()
    @Column({ type: 'varchar', length: 20, nullable: false })
    public_id: string;

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    url: string;

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    secure_url: string;

    constructor(image: Partial<Image>) {
        super();
        if (image) {
            Object.assign(
                this,
                plainToClass(Image, image, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = image.uuid || uuids4();
        }
    }
}
