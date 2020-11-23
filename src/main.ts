import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*
  Инициализация сервера
 */
async function bootstrap() {
  // Создание приложения Nest c корневым модулем AppModule
  const app = await NestFactory.create(AppModule);
  // Запуск на порту 3010
  await app.listen(3010);
}
bootstrap();
