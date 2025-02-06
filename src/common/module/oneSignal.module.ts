import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificationsController } from '../controllers/notifications.controller';
import { OneSignalService } from '../services/one-signal.service';

@Module({
  imports: [HttpModule],
  controllers: [NotificationsController],
  providers: [OneSignalService],
})
export class OneSignalModule {}
