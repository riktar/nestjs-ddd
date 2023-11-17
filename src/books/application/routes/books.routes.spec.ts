import { Test, TestingModule } from '@nestjs/testing';
import { BooksRoutes } from './books.routes';
import { BooksUseCases } from '../../core/usecases/books.usecases';

describe('BooksRoutes', () => {
  let controller: BooksRoutes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksRoutes],
      providers: [BooksUseCases],
    }).compile();

    controller = module.get<BooksRoutes>(BooksRoutes);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
