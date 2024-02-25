import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Http } from 'src/core/types';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    async getImages(): Promise<Http> {
        return await this.imageService.getImages();
    }

    @Post('upload-image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Http> {
        // Có thể cung cấp tham số image nếu cần
        console.log(file);
        const folder = 'images/';
        return await this.imageService.uploadImage(file, folder);
    }

    @Get(':uuid')
    async getImage(@Param('uuid') uuid: string): Promise<Http> {
        return await this.imageService.getImage(uuid);
    }

    @Delete(':uuid')
    async deleteImage(@Param('uuid') uuid: string): Promise<Http> {
        return await this.imageService.deleteImage(uuid);
    }
}
