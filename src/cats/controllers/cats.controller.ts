import { Body, Controller, Get, Header, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from '../services/cats.service';
import { Cat } from '../models/cat.entity';

// prefix 'cats' задает путь к данному контролеру (префиксы ко всем запросам данного контролера)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  /*
    get запрос на полчуение всех котов
    url: '/cats'
   */
  @Get()
  findAll(@Res({ passthrough: true }) res: Response): Promise<Cat[]> {
    // Пример импользования Express.Response совместно с nestJs
    // Ставим статус на ответ 200 (Успешно)
    res.status(HttpStatus.OK);

    // Берем из сервиса всех котов и возвращаем в качестве ответа на запрос
    return this.catsService.findAll();
  }

  /*
    get запрос на получение кота по id
    url: '/cats/:id'
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  /*
    post запрос на создание нового кота
    url: '/cats
   */
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() cat: Cat): Promise<Cat> {
    // Создание кота через catsService
    return this.catsService.create(cat);
  }
}
