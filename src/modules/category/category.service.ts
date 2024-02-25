import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http, HttpError, HttpResponse } from 'src/core/types';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async createCategory(category: Partial<Category>): Promise<Http> {
        if (!category.type || (category.type !== 'category' && category.type !== 'company') || !category.name) {
            return new HttpError({
                code: HttpStatus.BAD_REQUEST,
                message: 'Invalid data',
                data: {},
            });
        }
        const entity = new Category(category);
        const response = await this.categoryRepository.save(entity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Create category successfully',
            data: response,
        });
    }

    async updateCategory(uuid: string, category: Partial<Category>): Promise<Http> {
        const entity = await this.categoryRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Category not found',
                data: {},
            });

        Object.assign(entity, category);
        const response = await this.categoryRepository.save(entity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Update category successfully',
            data: response,
        });
    }

    async deleteCategory(uuid: string): Promise<Http> {
        const entity = await this.categoryRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Category not found',
                data: {},
            });

        await this.categoryRepository.remove(entity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Delete category successfully',
        });
    }

    async getCategory(uuid: string): Promise<Http> {
        const entity = await this.categoryRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Category not found',
                data: {},
            });

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get category successfully',
            data: entity,
        });
    }

    async getCategories(): Promise<Http> {
        const entities = await this.categoryRepository.find();
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get categories successfully',
            data: entities,
        });
    }
}
