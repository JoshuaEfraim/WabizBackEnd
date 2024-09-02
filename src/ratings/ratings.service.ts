import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RATING_REPOSITORY } from 'src/core/constants';

@Injectable()
export class RatingsService {
  
  constructor(@Inject(RATING_REPOSITORY) private readonly ratingModel: typeof Rating) {}

  async create(createRatingDto: CreateRatingDto, userId: number): Promise<Rating> {
    const { contentId, value } = createRatingDto;

    // Check if a rating already exists for the user and content
    const existingRating = await this.ratingModel.findOne({
      where: { contentId, userId },
    });

    if (existingRating) {
      // If the rating exists, update it or delete it based on the new value
      if (existingRating.value === value) {
        // If the same value is being set, delete the rating (unlike scenario)
        await existingRating.destroy();
        return null; // or return a message indicating the rating was removed
      } else {
        // Update the existing rating with the new value
        existingRating.value = value;
        return existingRating.save();
      }
    } else {
      // If no rating exists, create a new one
      return this.ratingModel.create({
        contentId,
        userId,
        value,
      });
    }
  }

  async getLikeCount(contentId: number): Promise<number> {
    return this.ratingModel.count({
      where: { contentId, value: 1 },
    });
  }
}
