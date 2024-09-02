import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateViewDto {
  @IsInt()
  @IsNotEmpty()
  contentId: number;
}
