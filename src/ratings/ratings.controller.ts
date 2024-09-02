import { Controller, Post, Body, Get, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  async createRating(@Body() createRatingDto: CreateRatingDto, @Req() req: any) {
    const userId = req.user.id;
    const rating = await this.ratingsService.create(createRatingDto, userId);

    if (!rating) {
      return { message: 'Rating removed' }; // Optionally return a response when a rating is removed
    }

    return rating;
  }

  @Get('content/:id/count')
  async getLikeCount(@Param('id') contentId: number) {
    const count = await this.ratingsService.getLikeCount(contentId);
    return { count };
  }
}