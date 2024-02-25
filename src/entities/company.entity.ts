import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base } from './base';
import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Image } from './image.entity';

@Entity({
    name: 'Company',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Company extends Base {
    @Expose()
    @Column({ type: 'varchar', default: '' })
    company_name: string;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    description: string;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    address: string;

    @Expose()
    @JoinColumn()
    @OneToOne(() => Image, (image) => image.uuid)
    avatar: Image;

    constructor(company: Partial<Company>) {
        super();
        if (company) {
            Object.assign(
                this,
                plainToClass(Company, company, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = company.uuid || uuids4();
        }
    }
}
