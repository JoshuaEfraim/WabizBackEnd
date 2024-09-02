import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { View } from './entities/view.entity';
import { Counter } from './entities/counter.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { IpLocatorService } from 'src/ip-locator/ip-locator.service'; // Adjust the import path
import { viewsProviders } from './views.providers';

@Module({
  controllers: [ViewsController],
  providers: [ViewsService, IpLocatorService, ...viewsProviders],
})
export class ViewsModule {}
