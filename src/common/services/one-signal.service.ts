import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OneSignalService {
  private readonly ONE_SIGNAL_APP_ID = 'eae0142a-8b54-48b5-886d-493f595aeba7';
  private readonly ONE_SIGNAL_REST_API_KEY = '7usmoyn2uuyvm5arbt3vcdlbo';

  constructor(private readonly httpService: HttpService) {}

  async sendNotification(message: string, playerIds: string[]) {
    const url = 'https://onesignal.com/api/v1/notifications';
    const headers = {
      Authorization: `Basic ${this.ONE_SIGNAL_REST_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const data = {
      app_id: this.ONE_SIGNAL_APP_ID,
      contents: { en: message },
      include_player_ids: playerIds,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
}
