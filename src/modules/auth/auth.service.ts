import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly memberService: MembersService,
        private readonly jwtService: JwtService,
    ) {}

    private async generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = await this.jwtService.signAsync(payload); // Ensure payload is passed here
        return token;
    }

    public async loginOrSignupMemberWithGoogle(profile: any) {
        const { email, firstName, lastName, picture } = profile;
        const memberData = { email, firstName, lastName, picture };
        
        let member = await this.memberService.findOneByEmail(email);

        if (!member) {
            // Create a new member if they don't exist
            member = await this.memberService.create(memberData);
        }

        member['role'] = 'member';

        const token = await this.generateToken(member);

        return { member, token };
    }

    async validateUser(username: string, pass: string, isAdmin: boolean) {
        const user = isAdmin
            ? await this.userService.findOneByEmail(username)
            : await this.memberService.findOneByEmail(username);

        if (!user) {
            return null;
        }

        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // Omit password from the result
        const { password, ...result } = user['dataValues'];
        return result;
    }

    public async loginAdmin(user: any) {
        user.role = 'admin'; // Assign role
        const token = await this.generateToken(user);
        return { user, token };
    }


    public async create(user) {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.create({ ...user, password: pass });
        const { password, ...result } = newUser['dataValues'];
        const token = await this.generateToken(result);
        return { user: result, token };
    }


    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        return await bcrypt.compare(enteredPassword, dbPassword);
    }
}
