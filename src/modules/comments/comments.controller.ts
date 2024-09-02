import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    const { content, uploadedBy, replyTo, replyToContent } = createCommentDto;
    return this.commentService.createComment(content, req.user.id, replyTo, replyToContent);
  }

  @Get('content/:id')
  getCommentsByContent(@Param('id') id: number) {
    return this.commentService.findCommentsByContent(id);
  }

  @Get('replies/:id')
  getReplies(@Param('id') id: number) {
    return this.commentService.findReplies(id);
  }
}
