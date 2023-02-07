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
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AreaTrabajoService } from './area_trabajo.service';
import { CreateAreaTrabajoDto } from './dto/create-area_trabajo.dto';
import { UpdateAreaTrabajoDto } from './dto/update-area_trabajo.dto';

@Controller('area-trabajo')
export class AreaTrabajoController {
  constructor(private readonly areaTrabajoService: AreaTrabajoService) {}

  @Post('register')
  create(@Body() createAreaTrabajoDto: CreateAreaTrabajoDto) {
    return this.areaTrabajoService.create(createAreaTrabajoDto);
  }

  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.areaTrabajoService.findAll(paginationDto);
  }

  @Get('search/:term')
  findOne(@Param('term') term: string) {
    return this.areaTrabajoService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaTrabajoDto: UpdateAreaTrabajoDto,
  ) {
    return this.areaTrabajoService.update(id, updateAreaTrabajoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.areaTrabajoService.remove(id);
  }
}
