import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Company, Job } from 'src/entities';
import { JobController } from './job.controller';
import { JobService } from './job.service';
@Module({
    imports: [TypeOrmModule.forFeature([Job, Category, Company])],
    controllers: [JobController],
    providers: [JobService],
    exports: [],
})
export class JobModule {}
