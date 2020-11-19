import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateCatDto } from './cats.dto';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Res({ passthrough: true }) res: Response): string {
    // Пример импользования Express.Response совместно с nestJs
    res.status(200);
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() cat: CreateCatDto): string {
    console.log(cat);
    return 'This action adds a new cat';
  }
}
