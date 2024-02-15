import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class DateTimeService {
  timezone = 'America/Guayaquil';

  getCurrentDateTime(): string {
    return moment().tz(this.timezone).format();
  }

  getCurrentDate(): string {
    return moment().tz(this.timezone).format('YYYY-MM-DD');
  }

  getCurrentTime(): string {
    return moment().tz(this.timezone).format('HH:mm:ss');
  }
}
