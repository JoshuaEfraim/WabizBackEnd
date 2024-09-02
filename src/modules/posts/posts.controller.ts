// posts.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
    UseGuards,
    Request,
    InternalServerErrorException,
    ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { ReturnPostDto } from './dto/return-post.dto';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    async findAll(): Promise<ReturnPostDto[]> {
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ReturnPostDto> {
        const post = await this.postService.findOne(id);

        if (!post) {
            throw new NotFoundException("This Post doesn't exist");
        }

        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<ReturnPostDto> {
        if (req.user.role !== 'admin') {
            throw new ForbiddenException('You do not have permission to create posts.');
        }
        return await this.postService.create(post, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() post: PostDto,
        @Request() req,
    ): Promise<any> {
        return "good"
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req): Promise<string> {
        const deleted = await this.postService.delete(id, req.user.id);

        if (deleted === 0) {
            throw new NotFoundException("This Post doesn't exist");
        }

        return 'Successfully deleted';
    }
}
