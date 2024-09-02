import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsInt()
  uploadedBy: number;

  @IsOptional()
  @IsInt()
  replyTo?: number;

  @IsOptional()
  @IsInt()
  replyToContent?: number;
}
