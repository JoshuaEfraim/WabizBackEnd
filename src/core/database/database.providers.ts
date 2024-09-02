import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Post } from 'src/modules/posts/post.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { View } from 'src/views/entities/view.entity';
import { Counter } from 'src/views/entities/counter.entity';
import { Member } from 'src/members/entities/member.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case TEST:
                config = databaseConfig.test;
                break;
            default:
                config = databaseConfig.test;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Post, Comment, Rating, View, Counter, Member]);
        await sequelize.sync();
        return sequelize;
    },
}];