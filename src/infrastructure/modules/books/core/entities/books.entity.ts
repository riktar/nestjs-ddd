import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({})
  @IsUUID()
  id: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  description: string;
}
