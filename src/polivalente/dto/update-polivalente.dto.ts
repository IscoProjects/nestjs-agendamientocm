import { PartialType } from '@nestjs/mapped-types';
import { CreatePolivalenteDto } from './create-polivalente.dto';

export class UpdatePolivalenteDto extends PartialType(CreatePolivalenteDto) {}
