import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http, HttpError, HttpResponse } from 'src/core';
import { Category, Company, Job } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
    ) {}

    async createJob(job: Partial<Job>, company: string, category: string): Promise<Http> {
        const [companyEntity, categoryEntity] = await Promise.all([
            this.companyRepository.findOne({
                where: {
                    uuid: company,
                },
            }),
            this.categoryRepository.findOne({
                where: {
                    uuid: category,
                },
            }),
        ]);

        if (!companyEntity || !categoryEntity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Company Or Category Not Found',
            });

        const entity = new Job({
            ...job,
            company: companyEntity,
            category: categoryEntity,
        });

        const response = await this.jobRepository.save(entity);

        if (!response)
            return new HttpError({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Create job failed',
            });

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Create Job Successfully',
            data: response,
        });
    }

    async updateJob(uuid: string, job: Partial<Job>): Promise<Http> {
        const entity = await this.jobRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Job not found',
            });

        Object.assign(entity, job);

        const response = await this.jobRepository.save(entity);

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Update job successfully',
            data: response,
        });
    }

    async deleteJob(uuid: string): Promise<Http> {
        const job = await this.jobRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!job) return new HttpError({ code: HttpStatus.NOT_FOUND, message: 'Job Not Found' });

        await this.jobRepository.remove(job);

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Delete Job Successfully',
            data: job,
        });
    }

    async getJob(uuid: string): Promise<Http> {
        const job = await this.jobRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!job) return new HttpError({ code: HttpStatus.NOT_FOUND, message: 'Job Not Found' });

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get Job Successfully',
            data: job,
        });
    }

    async getJobs(): Promise<Http> {
        const jobs: Job[] = await this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company')
            .leftJoinAndSelect('company.avatar', 'avatar')
            .leftJoinAndSelect('job.category', 'category')
            .getMany();

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get Jobs Successfully',
            data: jobs,
        });
    }
}
