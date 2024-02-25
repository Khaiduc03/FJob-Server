import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { Company } from './company.entity';
import { Category } from './category.entity';

@Entity({
    name: 'Job',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Job extends Base {
    @Expose()
    @Column({ type: 'varchar', unique: true, default: '' })
    job_name: string;

    @Expose()
    @OneToMany(() => Company, (company) => company.uuid)
    company: Company;

    @Expose()
    @Column({ type: 'float', default: 0 })
    salary: number;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    jod_description: string;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    minimum_quantification: string;

    @Expose()
    @Column({ type: 'simple-array', default: [] })
    perk: Array<string>;

    @Expose()
    @Column({ type: 'simple-array', default: [] })
    require_skill: Array<string>;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    job_level: string;

    @Expose()
    @ManyToOne(() => Category, (category) => category.uuid)
    category: Category;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    education: string;

    @Expose()
    @Column({ type: 'varchar', default: '' })
    experience: string;

    @Expose()
    @Column({ type: 'int', default: 0 })
    vacancy: number;

    constructor(job: Partial<Job>) {
        super();
        if (job) {
            Object.assign(
                this,
                plainToClass(Job, job, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = job.uuid || uuids4();
        }
    }
}
