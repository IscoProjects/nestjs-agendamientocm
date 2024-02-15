import { Module } from '@nestjs/common';
import { DateTimeService } from './services/date-time/date-time.service';

@Module({
  providers: [DateTimeService],
  exports: [DateTimeService],
})
export class CommonModule {}
