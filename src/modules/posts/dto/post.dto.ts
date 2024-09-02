import { IsNotEmpty, IsInt, IsOptional, IsEnum, IsString } from 'class-validator';

export enum Category {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export class PostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsInt()
  contentID?: number; // Make contentID optional and not readonly

  @IsNotEmpty()
  @IsInt()
  @IsEnum([1, 2, 3]) // Ensure the value is either 1, 2, or 3
  category: number;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsNotEmpty()
  @IsString()
  language: string;
}