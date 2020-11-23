import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './auth-local.guard';

/*
  Модуль для работы с авторизацией
 */
@Module({
  // Подключаем модуль для работы с пользователями (так как будем проверять правильность логина и пароля)
  // и модуль для работы с библиотекой Passport (в которой реализованы стратегии авторизации пользователей)
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}
