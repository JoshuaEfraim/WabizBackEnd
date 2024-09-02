import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './entities/rating.entity';
import { ratingsProviders } from './ratings.providers';

@Module({
  providers: [RatingsService, ...ratingsProviders],
  controllers: [RatingsController],
  exports: [RatingsService]
})
export class RatingsModule {}