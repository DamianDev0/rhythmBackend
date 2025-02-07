import { Controller, Post, Body } from '@nestjs/common';
import { OneSignalService } from '../services/one-signal.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly oneSignalService: OneSignalService) {}

  @Post('send')
  async sendNotification(
    @Body('message') message: string,
    @Body('filters') filters: any[],
  ) {
    return this.oneSignalService.sendNotification(message, filters);
  }
}
