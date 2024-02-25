import { Expose, plainToClass } from 'class-transformer';
import { uuids4 } from 'src/utils';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeAssociate, TypeGender, TypeRole } from './types';
import { Base } from './base';

@Entity({
    name: 'Project',
    orderBy: {
        createdAt: 'ASC',
    },
})
export class Project extends Base {
    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    project_name: string;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    role: string;

    @Expose()
    @Column({ type: 'bigint', default: '', length: 100 })
    from: string;

    @Expose()
    @Column({ type: 'bigint', default: '', length: 100 })
    to: string;

    @Expose()
    @Column({ type: 'bool', default: false,  })
    current: boolean;

    @Expose()
    @Column({ type: 'string', default: '', length: 100 })
    associate: TypeAssociate;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    description: string;

    @Expose()
    @Column({ type: 'varchar', default: '', length: 100 })
    project_url: string;

    constructor(project: Partial<Project>) {
        super();
        if (project) {
            Object.assign(
                this,
                plainToClass(Project, project, {
                    excludeExtraneousValues: true,
                })
            );
            this.uuid = this.uuid || uuids4();
        }
    }
}
