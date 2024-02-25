import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Http, HttpError, HttpResponse } from 'src/core';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
    ) {}

    async createCompany(company: Partial<Company>): Promise<Http> {
        if (!company && company === null) {
            return new HttpError({
                code: HttpStatus.BAD_REQUEST,
                message: 'Invalid data',
            });
        }

        const entity = new Company(company);
        // console.log('entity:', entity);
        const response = await this.companyRepository.save(entity);
        // console.log(response);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Create company successfully',
            data: response,
        });
    }

    async updateCompany(uuid: string, company: Partial<Company>): Promise<Http> {
        const entity = await this.companyRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'company not found',
                data: {},
            });

        Object.assign(entity, company);
        const response = await this.companyRepository.save(entity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Update information successfully',
            data: response,
        });
    }

    async deleteCompany(uuid: string): Promise<Http> {
        const entity = await this.companyRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Company not found',
                data: {},
            });

        await this.companyRepository.remove(entity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Delete company successfully',
        });
    }

    async getCompany(uuid: string): Promise<Http> {
        const entity = await this.companyRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Company not found',
                data: {},
            });

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get Company successfully',
            data: entity,
        });
    }

    async getCompanies(): Promise<Http> {
        const entities = await this.companyRepository.find();
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get companies successfully',
            data: entities,
        });
    }
}
