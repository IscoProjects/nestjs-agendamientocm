import { CreateAreaDto } from './create-area.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {}
