import { Module } from '@nestjs/common';
import { BooksRoutes } from './application/routes/books.routes';
import { BooksUseCases } from './core/usecases/books.usecases';
import { Book } from './core/entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const BookRepository = TypeOrmModule.forFeature([Book]);

@Module({
  imports: [BookRepository],
  controllers: [BooksRoutes],
  providers: [BooksUseCases],
  exports: [BooksUseCases, BookRepository],
})
export class BooksModule {}
