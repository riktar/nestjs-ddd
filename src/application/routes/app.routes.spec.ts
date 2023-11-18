import { Test, TestingModule } from '@nestjs/testing';
import { AppRoutes } from './app.routes';
import { AppUseCases } from '../../core/usecases/app.usecases';
import { BooksModule } from '../../infrastructure/modules/books/books.module';
import { DBTest } from '../../infrastructure/config/db.config';

describe('BooksRoutes', () => {
  let controller: AppRoutes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DBTest, BooksModule],
      controllers: [AppRoutes],
      providers: [AppUseCases],
    }).compile();

    controller = module.get<AppRoutes>(AppRoutes);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
