import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../models/cat.entity';

/*
  Сервис для работа с сущностью CAT в БД, использую репозиторий от TypeOrm
 */
@Injectable()
export class CatsService {
  /*
    В NestJS используется паттерн Dependency Injection для удобного импорта и подмены сущностей приложения.
    Это происходит автоматически средствами NestJs, путем определения типов импортируемых сущностей в конструкторе
   */
  constructor(
    // Подключение репозитория Cat, декоратор позволяет правильно зарезолвить репозиторий
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  /*
    Создание кота
   */
  create(cat: Cat) {
    return this.catsRepository.save(cat);
  }

  /*
    Получение всех котов
   */
  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  /*
    Получение кота по id
   */
  findOne(id: string): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  /*
    Удаление кота по id
   */
  async remove(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
