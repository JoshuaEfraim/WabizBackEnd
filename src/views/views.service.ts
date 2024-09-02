import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { View } from './entities/view.entity';
import { Counter } from './entities/counter.entity';
import { VIEW_REPOSITORY, COUNTER_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';
import { IpLocatorService } from 'src/ip-locator/ip-locator.service'; // Adjust the import path

@Injectable()
export class ViewsService {
  constructor(
    @Inject(VIEW_REPOSITORY) private readonly viewModel: typeof View,
    @Inject(COUNTER_REPOSITORY) private readonly counterModel: typeof Counter,
    private readonly ipLocatorService: IpLocatorService,
  ) {}

  async trackView(contentId: number, userIp: string): Promise<{ contentId: number; userIp: string; viewDate: Date; }> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of today
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // End of today

    // Check if the user has already viewed this content today
    const existingView = await this.viewModel.findOne({
      where: {
        userIp,
        contentId,
        viewDate: {
          [Op.between]: [todayStart, todayEnd], // Check if viewDate is within today
        },
      },
    });

    if (existingView) {
      // Do nothing if the user has already viewed the content today
      return {
        contentId,
        userIp,
        viewDate: existingView.viewDate,
      };
    }

    // Create a new view record
    const newView = await this.viewModel.create({
      contentId,
      userIp,
      viewDate: new Date(),
    });

    // Update the counter
    const counter = await this.counterModel.findOne({
      where: { contentId },
    });

    if (counter) {
      // Increment the counter by 1
      await this.counterModel.update(
        { count: counter.count + 1 },
        { where: { contentId } },
      );
    } else {
      // Create a new counter entry with count 1
      await this.counterModel.create({
        contentId,
        count: 1,
      });
    }

    return {
      contentId: newView.contentId,
      userIp: newView.userIp,
      viewDate: newView.viewDate,
    };
  }
}
