import { Body, Controller, Get, Post } from '@nestjs/common';
import { Http } from 'src/core/types';
import { AuthService } from './auth.service';
import { AuthPayload } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('create-account')
    async createAccount(@Body() payload: AuthPayload): Promise<Http> {
        const response = await this.authService.createAccount(payload);
        return response;
    }

    @Post('sign-in')
    async signIn(@Body() payload: AuthPayload): Promise<Http> {
        const response = await this.authService.signIn(payload);
        return response;
    }

    @Get()
    async getAllUser(): Promise<Http> {
        return this.authService.getAllUser();
    }
}
