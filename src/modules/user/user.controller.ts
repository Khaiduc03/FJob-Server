import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Http } from 'src/core/types';
import { User } from 'src/entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':uuid')
    async getUser(uuid: string): Promise<Http> {
        return await this.userService.getUser(uuid);
    }

    @Put(':uuid/update-user')
    async updateUser(@Param('uuid') uuid: string, @Body() user: Partial<User>): Promise<Http> {
        return await this.userService.updateUser(uuid, user);
    }

    @Delete(':uuid')
    async deleteUser(@Param('uuid') uuid: string): Promise<Http> {
        return await this.userService.deleteUser(uuid);
    }
}
