import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Http } from 'src/core';
import { Company } from 'src/entities';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get()
    async getCompanies(): Promise<Http> {
        return await this.companyService.getCompanies();
    }

    @Get(':uuid')
    async getCategory(@Param('uuid') uuid: string): Promise<Http> {
        return await this.companyService.getCompany(uuid);
    }

    @Post()
    async createCompany(@Body() company: Partial<Company>): Promise<Http> {
        console.log(company);
        return await this.companyService.createCompany(company);
    }

    @Put(':uuid')
    async updateCategory(@Body() company: Partial<Company>, @Param('uuid') uuid: string): Promise<Http> {
        return await this.companyService.updateCompany(uuid, company);
    }

    @Delete(':uuid')
    async deleteCategory(@Param('uuid') uuid: string): Promise<Http> {
        return await this.companyService.deleteCompany(uuid);
    }
}
