import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/models/user.entity';

/*
  Сервис для работы с авторизацией
 */
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    // Ищем пользователя по логину
    const user = await this.usersService.findOne(login);
    // Проверяем, что пользователь существует и пароль совпадает
    if (user && user.password === password) {
      // Создаём объект result, который равен user, но без поля password
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
