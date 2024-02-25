import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http, HttpError, HttpResponse } from 'src/core';
import { Job, User_Job } from 'src/entities';

import { Repository } from 'typeorm';

@Injectable()
export class UserJobService {
    constructor(
        @InjectRepository(User_Job)
        private readonly userJobRepository: Repository<User_Job>
    ) {}

    async createUserJob(uuid: string, userJob: Partial<User_Job>): Promise<Http> {
        if (!userJob && userJob === null)
            return new HttpError({
                code: HttpStatus.BAD_REQUEST,
                message: 'Invalid data',
            });

        const entity = new User_Job(userJob);
        const response = await this.userJobRepository.save(entity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Apply job successfully',
            data: uuid,
        });
    }

    async getUserJob(uuid: string): Promise<Http> {
        const userJob = await this.userJobRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!userJob)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'User job not found',
            });

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get user job successfully',
            data: userJob,
        });
    }

    async getUserJobs(): Promise<Http> {
        const userJob = await this.userJobRepository.find();

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get all user jobs successfully',
            data: userJob,
        });
    }

    async deleteUser(uuid: string): Promise<Http> {
        const user = await this.userJobRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!user) return new HttpError({ code: HttpStatus.NOT_FOUND, message: 'User not found' });

        await this.userJobRepository.delete(uuid);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Delete user job successfully',
            data: user,
        });
    }
}
