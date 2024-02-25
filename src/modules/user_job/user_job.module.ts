import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Job } from 'src/entities';
import { UserJobController } from './user_job.controller';
import { UserJobService } from './user_job.service';

@Module({
    imports: [TypeOrmModule.forFeature([User_Job])],
    providers: [UserJobService],
    controllers: [UserJobController],
})
export class UserJobModule {}
