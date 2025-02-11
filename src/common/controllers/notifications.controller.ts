import { Controller, Post, Body } from '@nestjs/common';
import { OneSignalService } from '../services/one-signal.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly oneSignalService: OneSignalService) {}

  @Post('send')
  async sendNotification(
    @Body('title') title: string,
    @Body('message') message: string,
    @Body('oneSignalIds') oneSignalIds: string[],
    @Body('scheduleOptions')
    @Body('filters')
    filters?: any[],
    scheduleOptions?: {
      sendAfter?: string;
      delayedOption?: 'timezone' | 'last-active';
      deliveryTimeOfDay?: string;
    },
  ) {
    return this.oneSignalService.sendNotification(
      title,
      message,
      oneSignalIds,
      filters,
      scheduleOptions,
    );
  }
}
