import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http, HttpError, HttpResponse } from 'src/core/types';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUser(uuid: string): Promise<Http> {
        const user = await this.userRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!user)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'User not found',
            });

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get user successfully',
            data: user,
        });
    }

    async getUsers(): Promise<Http> {
        const users = await this.userRepository.find();

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Get users successfully',
            data: users,
        });
    }

    // async updateUser(uuid: string, user: Partial<User>): Promise<Http> {
    //     const entity = await this.userRepository.findOne({
    //         where: {
    //             uuid,
    //         },
    //     });

    //     if (!entity)
    //         return new HttpError({
    //             code: HttpStatus.NOT_FOUND,
    //             message: 'User not found',
    //         });

    //     Object.assign(entity, user);

    //     const response = await this.userRepository.save(entity);

    //     return new HttpResponse({
    //         code: HttpStatus.OK,
    //         message: 'Update user successfully',
    //         data: response,
    //     });
    // }

    async updateUser(uuid: string, user: Partial<User>): Promise<Http> {
        const allowedFields = ['full_name', 'nick_name', 'phone_number', 'dob', 'gender', 'address', 'summary'];
        // only update object key in fileld
        const updateFields = Object.keys(user).filter((field) => allowedFields.includes(field));

        if (updateFields.length === 0) {
            return new HttpError({
                code: HttpStatus.BAD_REQUEST,
                message: 'No valid fields to update',
            });
        }

        const entity = await this.userRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity) {
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'User not found',
            });
        }
        //check null or undefined, if it null or undefined , it will be skiped 
        for (const field of updateFields) {
            entity[field] = user[field];
        }

        const response = await this.userRepository.save(entity);

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Update user successfully',
            data: response,
        });
    }

    async deleteUser(uuid: string): Promise<Http> {
        const user = await this.userRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!user) return new HttpError({ code: HttpStatus.NOT_FOUND, message: 'User not found' });

        await this.userRepository.delete(uuid);
        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'Delete user successfully',
            data: user,
        });
    }
}
