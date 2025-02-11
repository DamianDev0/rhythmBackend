import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OneSignalService {
  private readonly ONE_SIGNAL_APP_ID = 'eae0142a-8b54-48b5-886d-493f595aeba7';
  private readonly ONE_SIGNAL_REST_API_KEY =
    'os_v2_app_5lqbikulkrellcdnje7vswxlu6qtclhk46ku2bmd5brl7orwkvyubdi7fv53wjxy3mg4bd4zlf7i64fzyqjhdxsz4s5utpc2at6jnui';

  constructor(private readonly httpService: HttpService) {}

  async sendNotification(
    title: string,
    message: string,
    oneSignalIds?: string[],
    filters?: any[],
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
      target_channel: 'push',
      headings: { en: title },
      contents: { en: message },
    };

    if (oneSignalIds?.length) {
      data.include_aliases = { onesignal_id: oneSignalIds };
    } else if (filters?.length) {
      data.filters = filters;
    } else {
      throw new Error(
        'Debes proporcionar al menos un "oneSignalId" o definir "filters".',
      );
    }

    if (scheduleOptions) {
      if (scheduleOptions.sendAfter)
        data.send_after = scheduleOptions.sendAfter;
      if (scheduleOptions.delayedOption)
        data.delayed_option = scheduleOptions.delayedOption;
      if (scheduleOptions.deliveryTimeOfDay)
        data.delivery_time_of_day = scheduleOptions.deliveryTimeOfDay;
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
