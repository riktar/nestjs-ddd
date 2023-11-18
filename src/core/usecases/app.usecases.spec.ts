import { Test, TestingModule } from '@nestjs/testing';
import { AppUseCases } from './app.usecases';
import { BooksModule } from '../../infrastructure/modules/books/books.module';
import { DBTest } from '../../infrastructure/config/db.config';

describe('AppUseCases', () => {
  let useCases: AppUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DBTest, BooksModule],
      providers: [AppUseCases],
    }).compile();

    useCases = module.get<AppUseCases>(AppUseCases);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  describe('app usecases', () => {
    it('should return "Hello World!"', () => {
      expect(useCases.helloWorld()).toBe('Hello World!');
    });
  });
});
