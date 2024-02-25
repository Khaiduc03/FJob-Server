import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayload, AuthResponse } from './types';
import { JWTService } from 'src/configs';
import { Http, HttpError, HttpResponse } from 'src/core/types';
import { comparePassword, hashPassword } from 'src/utils';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JWTService
    ) {}

    async createAccount(payload: AuthPayload): Promise<Http> {
        const password = await hashPassword(payload.password);

        const user = new User({
            ...payload,
            password: password,
        });

        const response = await this.userRepository.save(user);

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'OK',
            data: response,
        });
    }

    async signIn(payload: AuthPayload): Promise<Http> {
        const user = await this.userRepository.findOne({
            where: {
                email: payload.email,
            },
        });

        if (!user)
            return new HttpError({
                code: HttpStatus.NOT_FOUND,
                message: 'User not found',
                data: {},
            });

        const isMatch = await comparePassword(payload.password, user.password);

        if (!isMatch)
            return new HttpError({
                code: HttpStatus.BAD_REQUEST,
                message: 'Password is incorrect',
                data: {},
            });

        const access_token = await this.jwtService.signToken(
            {
                uuid: user.uuid,
                role: [1],
            },
            'access'
        );

        const refresh_token = await this.jwtService.signToken(
            {
                uuid: user.uuid,
                role: [1],
            },
            'refresh'
        );

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'OK',
            data: {
                access_token,
                refresh_token,
            },
        });
    }

    async getAllUser(): Promise<HttpResponse<User[]>> {
        const users = await this.userRepository.find();

        return new HttpResponse({
            code: HttpStatus.OK,
            message: 'OK',
            data: users,
        });
    }
}
