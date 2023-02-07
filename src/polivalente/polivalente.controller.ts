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
import { PolivalenteService } from './polivalente.service';
import { CreatePolivalenteDto } from './dto/create-polivalente.dto';
import { UpdatePolivalenteDto } from './dto/update-polivalente.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('polivalente')
export class PolivalenteController {
  constructor(private readonly polivalenteService: PolivalenteService) {}

  @Post('register')
  create(@Body() createPolivalenteDto: CreatePolivalenteDto) {
    return this.polivalenteService.create(createPolivalenteDto);
  }

  @Get('list')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.polivalenteService.findAll(paginationDto);
  }

  @Get('search/:term')
  findOne(@Param('term') term: string) {
    return this.polivalenteService.findOne(term);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePolivalenteDto: UpdatePolivalenteDto,
  ) {
    return this.polivalenteService.update(id, updatePolivalenteDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.polivalenteService.remove(id);
  }
}
