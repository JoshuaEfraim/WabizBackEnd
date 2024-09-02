import { Injectable, Inject } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { MEMBER_REPOSITORY } from 'src/core/constants';
import { MemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {

    constructor(@Inject(MEMBER_REPOSITORY) private readonly memberRepository: typeof Member) { }

    async create(user: MemberDto): Promise<Member> {
        return await this.memberRepository.create<Member>(user);
    }

    async findOneByEmail(email: string): Promise<Member> {
        return await this.memberRepository.findOne<Member>({ where: { email } });
    }

    async findOneById(id: number): Promise<Member> {
        return await this.memberRepository.findOne<Member>({ where: { id } });
    }
}