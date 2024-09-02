// comments.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { commentsProviders } from './comments.providers';
import { COMMENT_REPOSITORY } from '../../core/constants';

@Module({
  imports: [
  ],
  controllers: [CommentsController],
  providers: [
    ...commentsProviders,
    CommentsService,
  ],
  exports: [
    CommentsService, // Export if used in other modules
  ],
})
export class CommentsModule {}
