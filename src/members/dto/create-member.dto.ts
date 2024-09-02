import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';


export class MemberDto {
    @IsNotEmpty()
    readonly firstName: any;

    @IsNotEmpty()
    readonly lastName: any;

    @IsNotEmpty()
    @IsEmail()
    readonly email: any;

    @IsNotEmpty()
    readonly picture: any;
}
