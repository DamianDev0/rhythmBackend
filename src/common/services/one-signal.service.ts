import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OneSignalService {
  private readonly ONE_SIGNAL_APP_ID: string;
  private readonly ONE_SIGNAL_REST_API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.ONE_SIGNAL_APP_ID =
      this.configService.get<string>('ONE_SIGNAL_APP_ID');
    this.ONE_SIGNAL_REST_API_KEY = this.configService.get<string>(
      'ONE_SIGNAL_REST_API_KEY',
    );
  }

  async sendNotification(
    title: string,
    message: string,
    oneSignalIds: string[],
    scheduleOptions?: {
      sendAfter?: string;
      delayedOption?: 'timezone' | 'last-active';
      deliveryTimeOfDay?: string;
    },
  ) {
    const url = 'https://api.onesignal.com/notifications';
    const headers = {
      accept: 'application/json',
      Authorization: `Basic ${this.ONE_SIGNAL_REST_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const data: any = {
      app_id: this.ONE_SIGNAL_APP_ID,
      include_aliases: { onesignal_id: oneSignalIds },
      target_channel: 'push',
      headings: { en: title },
      contents: { en: message },
    };
    if (scheduleOptions) {
      if (scheduleOptions.sendAfter) {
        data.send_after = scheduleOptions.sendAfter;
      }
      if (scheduleOptions.delayedOption) {
        data.delayed_option = scheduleOptions.delayedOption;
      }
      if (scheduleOptions.deliveryTimeOfDay) {
        data.delivery_time_of_day = scheduleOptions.deliveryTimeOfDay;
      }
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error enviando la notificación:',
        error.response?.data || error,
      );
      throw error;
    }
  }
}
