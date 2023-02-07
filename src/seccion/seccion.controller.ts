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
import { SeccionService } from './seccion.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('seccion')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Post('register')
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionService.create(createSeccionDto);
  }

  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.seccionService.findAll(paginationDto);
  }

  @Get('search/:term')
  findOne(@Param('term') term: string) {
    return this.seccionService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSeccionDto: UpdateSeccionDto,
  ) {
    return this.seccionService.update(id, updateSeccionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.seccionService.remove(id);
  }
}
