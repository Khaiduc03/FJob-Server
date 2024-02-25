import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { Repository } from 'typeorm';
import { CloudService } from '../cloud';
import { Http, HttpError, HttpResponse } from 'src/core/types';
@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly cloudinary: CloudService
    ) {}

    async uploadImageToCloudinary(file: Express.Multer.File, folder: string): Promise<any> {
        return await this.cloudinary.uploadFileImage(file, folder).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
    }

    async uploadImage(file: Express.Multer.File, folder: string): Promise<Http> {
        const image: Partial<Image> = {};
        const imageEntity = new Image(image);
        const response = await this.uploadImageToCloudinary(file, folder);
        const { url, public_id, secure_url } = response;
        imageEntity.url = url;
        imageEntity.public_id = public_id;
        imageEntity.secure_url = secure_url;

        const data = await this.imageRepository.save(imageEntity);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Upload images successful!!',
            data: data,
        });
    }

    async getImages(): Promise<Http> {
        const response = await this.imageRepository.find();
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get images successful!!',
            data: response,
        });
    }

    async getImage(uuid: string): Promise<Http> {
        const image = await this.imageRepository.findOne({
            where: {
                uuid: uuid,
            },
        });
        if (!image)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Get images faill!!',
                data: {},
            });
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get image successful!!',
            data: image,
        });
    }

    async deleteImage(uuid: string): Promise<Http> {
        const image = await this.imageRepository.findOne({
            where: {
                uuid: uuid,
            },
        });
        if (!image)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'Get images faill!!',
                data: {},
            });
        await this.imageRepository.remove(image);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Delete image successful!!',
            data: image,
        });
    }
}
