import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
