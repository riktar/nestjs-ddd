import { Test, TestingModule } from '@nestjs/testing';
import { BooksUsecases } from './books.usecases';

describe('BooksService', () => {
  let useCases: BooksUsecases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksUsecases],
    }).compile();

    useCases = module.get<BooksUsecases>(BooksUsecases);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(service.create()).toBe('Hello World!');
  //   });
  // });
});
