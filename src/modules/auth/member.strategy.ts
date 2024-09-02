import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class MemberStrategy extends PassportStrategy(Strategy, 'member') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password, false); // false for member

        if (!user) {
            throw new UnauthorizedException('Invalid member credentials');
        }
        return user;
    }
}
