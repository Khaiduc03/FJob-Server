import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from 'src/entities';
import { Http } from 'src/core';
import { JobPayload } from './types';

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) {}

    @Post()
    async createJob(@Body() body: JobPayload): Promise<Http> {
        const { job, category, company } = body;
        return await this.jobService.createJob(job, company, category);
    }

    @Put(':uuid')
    async updateJob(@Body() body: Partial<Job>, @Param('uuid') uuid: string): Promise<Http> {
        return await this.jobService.updateJob(uuid, body);
    }

    @Delete(':uuid')
    async deleteJob(@Param('uuid') uuid: string): Promise<Http> {
        return await this.jobService.deleteJob(uuid);
    }

    @Get()
    async getJobs(): Promise<Http> {
        return await this.jobService.getJobs();
    }

    @Get(':uuid')
    async getJob(@Param('uuid') uuid: string): Promise<Http> {
        return await this.jobService.getJob(uuid);
    }
}
