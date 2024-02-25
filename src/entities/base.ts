import { Expose } from 'class-transformer';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Base extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Expose()
    @Column({ type: 'bigint', default: new Date().getTime() })
    createdAt: number;

    @Expose()
    @Column({ type: 'bigint', default: new Date().getTime() })
    updatedAt: number;

    @Expose()
    @Column({ type: 'bigint', default: null })
    deletedAt: number;

    constructor() {
        super();
        this.createdAt = new Date().getTime();
        this.updatedAt = new Date().getTime();
        this.deletedAt = null;
    }
}
