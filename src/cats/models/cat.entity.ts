import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
  Описание сущности Cat для БД с простыми полями
 */
@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
