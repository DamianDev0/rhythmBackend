import { Controller, Post, Body } from '@nestjs/common';
import { OneSignalService } from '../services/one-signal.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly oneSignalService: OneSignalService) {}

  @Post('send')
  async sendNotification(
    @Body('message') message: string,
    @Body('playerIds') playerIds: string[],
  ) {
    return this.oneSignalService.sendNotification(message, playerIds);
  }
}
