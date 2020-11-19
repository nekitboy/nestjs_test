import { Module } from '@nestjs/common';
import { Cat } from './models/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
