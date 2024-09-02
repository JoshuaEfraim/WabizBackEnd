import { Member } from "./entities/member.entity";
import { MEMBER_REPOSITORY } from "src/core/constants";

export const membersProviders = [{
    provide: MEMBER_REPOSITORY,
    useValue: Member,
}];