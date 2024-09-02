import { Controller, Post, Body, Req } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { IpLocatorService } from 'src/ip-locator/ip-locator.service'; // Adjust the import path

@Controller('views')
export class ViewsController {
  constructor(
    private readonly viewsService: ViewsService,
    private readonly ipLocatorService: IpLocatorService,
  ) {}

  @Post()
  async trackView(@Body() createViewDto: CreateViewDto, @Req() req: any) {
    const userIp = this.ipLocatorService.getIpAddress(req);

    if (!userIp) {
      throw new Error('Unable to retrieve IP address');
    }

    const view = await this.viewsService.trackView(createViewDto.contentId, userIp);
    
    return {
      message: 'View recorded successfully',
      data: view,
    };
  }
}
