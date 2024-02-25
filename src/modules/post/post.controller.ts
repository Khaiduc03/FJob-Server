import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from 'src/entities';
import { Http } from 'src/core';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() post: Partial<PostEntity>): Promise<Http> {
        return await this.postService.createPost(post);
    }

    @Put(':uuid')
    async updatePost(@Param('uuid') uuid: string, @Body() post: Partial<PostEntity>): Promise<Http> {
        return await this.postService.updatePost(uuid, post);
    }

    @Delete(':uuid')
    async deletePost(@Param('uuid') uuid: string): Promise<Http> {
        return await this.postService.deletePost(uuid);
    }

    @Get(':uuid')
    async getPostByUuid(@Param('uuid') uuid: string): Promise<Http> {
        return await this.postService.getPost(uuid);
    }

    @Get()
    async getPosts(): Promise<Http> {
        return await this.postService.getPosts();
    }
}
