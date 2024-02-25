import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category.entity';
import { Http } from 'src/core/types';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Put(':uuid')
    async updateCategory(@Body() category: Partial<Category>, @Param('uuid') uuid: string): Promise<Http> {
        return await this.categoryService.updateCategory(uuid, category);
    }

    @Delete(':uuid')
    async deleteCategory(@Param('uuid') uuid: string): Promise<Http> {
        return await this.categoryService.deleteCategory(uuid);
    }

    @Get(':uuid')
    async getCategory(@Param('uuid') uuid: string): Promise<Http> {
        return await this.categoryService.getCategory(uuid);
    }

    @Get()
    async getCategories(): Promise<Http> {
        return await this.categoryService.getCategories();
    }

    @Post()
    async createCategory(@Body() category: Partial<Category>): Promise<Http> {
        return await this.categoryService.createCategory(category);
    }
}
