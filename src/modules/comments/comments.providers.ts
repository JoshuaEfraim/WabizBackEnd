import { COMMENT_REPOSITORY } from '../../core/constants';
import { Comment } from './entities/comment.entity';

export const commentsProviders = [{
    provide: COMMENT_REPOSITORY,
    useValue: Comment,
}];