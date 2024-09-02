import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';
import { ViewsModule } from './views/views.module';
import { MembersModule } from './members/members.module';
import { GoogleStrategy } from './modules/auth/google.strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        PostsModule,
        CommentsModule,
        RatingsModule,
        ViewsModule,
        MembersModule,
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ]
})
export class AppModule { }