import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

/* Описание коневого модуля

  По архитектуре выделяем отдельно
  - контроллеры, которые обрабатываю роуты (защита роутов, преобразование данных, валидация данных)
  - сервисы, которые обрабатывают логику приложения (хранение, обработка, получение данных)
  - репозитории, которые ответсвенны за работу с базой данных (в нашем случае используем готовые репозитория от typeOrm)
*/

@Module({
  // Подключение модулей (и их зависимостей: сервисы, контроллеры) к нашему приложению
  imports: [
    // Подключение модуля TypeOrm для работы с базой данных (sqlite)
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sql', // путь до файла, где будет хранится база
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Классы, которые описывают таблицы в БД
      synchronize: true, // Для синхронизации структуры базы данных при каждым запуске с описанными entities
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
  // Обработчики роутов
  controllers: [AppController],
  // Классы для работы с nest приложением, которые могут подключать (dependency injection) другие провайдеры приложения
  providers: [AppService],
})
export class AppModule {}
