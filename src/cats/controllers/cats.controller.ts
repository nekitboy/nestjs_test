import { Body, Controller, Delete, Get, Header, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from '../services/cats.service';
import { Cat } from '../models/cat.entity';
import { LocalAuthGuard } from '../../auth/auth-local.guard'

// prefix 'cats' задает путь к данному контролеру (префиксы ко всем запросам данного контролера)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  /*
    get запрос на полчуение всех котов, на что указывает декоратор `@Get()`
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
    get запрос на получение кота по id, на что указывает декоратор `@Get(':id')`
    url: '/cats/:id'
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  /*
    post запрос на создание нового кота, на что указывает декоратор `@Post()`
    url: '/cats'
   */
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() cat: Cat): Promise<Cat> {
    // Создание кота через catsService
    return this.catsService.create(cat);
  }

  /*
    delete запрос на удаление кода по id, на что указывает декоратор `@Delete(':id')`
    только для авторищированныз пользователей `@UseGuards(LocalAuthGuard)`
    url: '/cats/:id' (параметр id)
   */
  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  delete(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
