import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';
import { COMMENT_REPOSITORY } from 'src/core/constants';

@Injectable()
export class CommentsService {

    constructor(@Inject(COMMENT_REPOSITORY) private readonly commentModel: typeof Comment) { }


  async createComment(content: string, uploadedBy: number, replyTo?: number, replyToContent?: number): Promise<Comment> {
    return this.commentModel.create({
      content,
      uploadedBy,
      replyTo: replyTo || null,
      replyToContent: replyToContent || null,
    });
  }

  async findCommentsByContent(contentId: number): Promise<Comment[]> {
    return this.commentModel.findAll({ where: { replyToContent: contentId }, include: [{ all: true }] });
  }

  async findReplies(commentId: number): Promise<Comment[]> {
    return this.commentModel.findAll({ where: { replyTo: commentId }, include: [{ all: true }] });
  }
}