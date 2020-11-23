import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /*
    Метод будет использоваться автоматически при авторизации

    Метод для валидации пользователя по username и password
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    // В случае, когда пользователь с такими данными не найден, возвращаем 401 ошибку (Unauthorized)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
