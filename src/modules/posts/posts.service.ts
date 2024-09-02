// posts.service.ts
import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { POST_REPOSITORY } from '../../core/constants';
import { ReturnPostDto } from './dto/return-post.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
    ) {}

    async create(postDto: PostDto, userId: number): Promise<ReturnPostDto> {
        // Check if contentID is provided, if not, generate the next contentID
        if (!postDto.contentID) {
            const maxContentID = await this.postRepository.max('contentID');
            postDto.contentID = (maxContentID !== null ? Number(maxContentID) : 0) + 1;
        }
        // Create the post with the provided or generated contentID and the associated userId
        const createdPost = await this.postRepository.create<Post>({ 
            ...postDto, 
            userId 
        });

        // Return a simplified version of the created post
        return {
            id: createdPost.id,
            title: createdPost.title,
            body: createdPost.body,
            category: createdPost.category,
            tags: createdPost.tags,
            contentID: createdPost.contentID, // Include contentID in the return
            language: createdPost.language,   // Include language in the return
        };
    }

    
    async findAll(): Promise<ReturnPostDto[]> {
        const posts = await this.postRepository.findAll<Post>();
        return posts.map(post => ({
            id: post.id,
            title: post.title,
            contentID: post.contentID,
            body: post.body,
            category: post.category,
            tags: post.tags,
            language: post.language
        }));
    }

    async findOne(id: number): Promise<ReturnPostDto> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException("This Post doesn't exist");
        }
        return {
            id: post.id,
            title: post.title,
            contentID: post.contentID,
            body: post.body,
            category: post.category,
            tags: post.tags,
            language: post.language
        };
    }

    async update(id: number, data: PostDto, userId: number): Promise<ReturnPostDto> {
        const [numberOfAffectedRows, updatedPosts] = await this.postRepository.update(
            { ...data, updatedBy: userId },
            { where: { id }, returning: true }
        );

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException("This Post doesn't exist");
        }

        const updatedPost = updatedPosts[0];

        return {
            id: updatedPost.id,
            title: updatedPost.title,
            contentID: updatedPost.contentID,
            body: updatedPost.body,
            category: updatedPost.category,
            tags: updatedPost.tags,
            language: updatedPost.language
        };
    }

    async delete(id: number, userId: number): Promise<number> {
        return await this.postRepository.destroy({ where: { id, userId } });
    }
}
