import { Test, TestingModule } from '@nestjs/testing';
import { BooksRoutes } from './books.routes';
import { BooksUseCases } from '../../core/usecases/books.usecases';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../../core/entities/books.entity';
import { Repository } from 'typeorm';

describe('BooksRoutes', () => {
  let controller: BooksRoutes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksRoutes],
      providers: [
        BooksUseCases,
        { provide: getRepositoryToken(Book), useValue: Repository },
      ],
    }).compile();

    controller = module.get<BooksRoutes>(BooksRoutes);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
