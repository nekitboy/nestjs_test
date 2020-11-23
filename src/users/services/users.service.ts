import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

/*
  Модуль для работы с пользователями.

  Реализована упращенная работа с пользователями, пользователей храним в базе данных, пароли не шифруем,
  можем только получить имеющегося пользователя по login (нет добавление и удаления)
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    // В конструкторе можно описать логику, которая выполнится при создании класса (инициализации этого сервиса)
    this.initUsers();
  }

  /*
    Инициализация пользоватей и сохранение из в базу данных, если в базе нет пользователей
   */
  private async initUsers() {
    const usersCount = await this.usersRepository.count();
    if (usersCount === 0) {
      this.usersRepository.save([
        { login: 'admin', password: 'admin' },
        { login: 'user', password: '123' },
      ]);
    }
  }

  /*
    Получение пользователя по login
   */
  findOne(login: string): Promise<User | undefined> {
    // Паметр where отвечает за условие получение пользователя их бд (поле сущности в бд `login` соответсвует значению в
    // переменной `login`
    return this.usersRepository.findOne({ where: { login: login } });
  }
}
