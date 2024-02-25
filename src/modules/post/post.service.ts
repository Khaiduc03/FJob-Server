import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http } from 'src/core';
import { Post } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async createPost(post: Partial<Post>): Promise<Http> {
        const entity = new Post(post);
        const response = await this.postRepository.save(entity);
        if (!response)
            return new Http({
                code: HttpStatus.BAD_REQUEST,
                message: 'Create post failed',
            });

        return new Http({
            code: HttpStatus.OK,
            message: 'Create post successfully',
            data: response,
        });
    }

    async updatePost(uuid: string, post: Partial<Post>): Promise<Http> {
        const entity = await this.postRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new Http({
                code: HttpStatus.NOT_FOUND,
                message: 'Post not found',
            });

        Object.assign(entity, post);
        const response = await this.postRepository.save(entity);

        return new Http({
            code: HttpStatus.OK,
            message: 'Update post successfully',
            data: response,
        });
    }

    async deletePost(uuid: string): Promise<Http> {
        const entity = await this.postRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!entity)
            return new Http({
                code: HttpStatus.NOT_FOUND,
                message: 'Post not found',
            });

        await this.postRepository.delete(entity.uuid);

        return new Http({
            code: HttpStatus.OK,
            message: 'Delete post successfully',
        });
    }

    async getPost(uuid: string): Promise<Http> {
        const post = await this.postRepository.findOne({
            where: {
                uuid,
            },
        });

        if (!post)
            return new Http({
                code: HttpStatus.NOT_FOUND,
                message: 'Post not found',
            });

        return new Http({
            code: HttpStatus.OK,
            message: 'Get post successfully',
            data: post,
        });
    }

    async getPosts(): Promise<Http> {
        const posts = await this.postRepository.find();

        return new Http({
            code: HttpStatus.OK,
            message: 'Get posts successfully',
            data: posts,
        });
    }
}
