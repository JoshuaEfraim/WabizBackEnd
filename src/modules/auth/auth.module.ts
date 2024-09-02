import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AdminStrategy } from './admin.strategy';
import { JwtStrategy } from './jwt.strategy';
import { MembersModule } from 'src/members/members.module';
import { MemberStrategy } from './member.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        MembersModule,
        JwtModule.register({
            secret: process.env.JWTKEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    providers: [
        AuthService,
        AdminStrategy,
        MemberStrategy,
        JwtStrategy,
        GoogleStrategy
    ],
    controllers: [AuthController],
})
export class AuthModule { }