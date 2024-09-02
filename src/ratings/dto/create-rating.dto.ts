import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(0)
  @Max(1)
  value: number;

  @IsInt()
  contentId: number;

  @IsOptional()
  @IsInt()
  userId?: number; // Optional if the userId is handled separately
}
