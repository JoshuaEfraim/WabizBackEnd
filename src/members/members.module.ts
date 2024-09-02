import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { membersProviders } from './members.providers';

@Module({
    providers: [MembersService, ...membersProviders],
    exports: [MembersService],
})
export class MembersModule {}
