import { Module } from '@nestjs/common';
import { Cat } from './models/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';

/*
  Модуль для работы с котами (пример небольшого crud)
 */
@Module({
  // Подключение модуля для работы с базой даных для таблицы (сущности) Cat
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
