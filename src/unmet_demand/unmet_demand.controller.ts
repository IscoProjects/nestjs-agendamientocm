import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UnmetDemandService } from './unmet_demand.service';
import { CreateUnmetDemandDto } from './dto/create-unmet_demand.dto';
import { UpdateUnmetDemandDto } from './dto/update-unmet_demand.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('unmet-demand')
export class UnmetDemandController {
  constructor(private readonly unmetDemandService: UnmetDemandService) {}

  @Post('register')
  create(@Body() createUnmetDemandDto: CreateUnmetDemandDto) {
    return this.unmetDemandService.create(createUnmetDemandDto);
  }

  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.unmetDemandService.findAll(paginationDto);
  }

  @Get('search/:term')
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.unmetDemandService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUnmetDemandDto: UpdateUnmetDemandDto,
  ) {
    return this.unmetDemandService.update(id, updateUnmetDemandDto);
  }

  @Delete('delete:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.unmetDemandService.remove(id);
  }
}
