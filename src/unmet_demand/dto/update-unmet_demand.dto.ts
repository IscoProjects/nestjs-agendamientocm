import { PartialType } from '@nestjs/mapped-types';
import { CreateUnmetDemandDto } from './create-unmet_demand.dto';

export class UpdateUnmetDemandDto extends PartialType(CreateUnmetDemandDto) {}
