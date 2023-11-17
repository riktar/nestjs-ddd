import { Module } from '@nestjs/common';
import { BooksRoutes } from './application/routes/books.routes';
import { BooksUseCases } from './core/usecases/books.usecases';
import { Book } from './core/entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksRoutes],
  providers: [BooksUseCases],
})
export class BooksModule {}
