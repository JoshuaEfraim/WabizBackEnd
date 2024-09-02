import { Controller, Body, Post, UseGuards, Request, UnauthorizedException, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { MemberDto } from 'src/members/dto/create-member.dto';
import { DoesMemberExist } from 'src/core/guards/doesMemberExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('admin'))
    @Post('login/admin')
    async loginAdmin(@Request() req) {
        return await this.authService.loginAdmin(req.user);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        return req.user; // Contains token and member info
    }

    @UseGuards(DoesUserExist)
    @Post('signup/admin')
    async signUpAdmin(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}
