import { Test, TestingModule } from '@nestjs/testing';
import { BooksUseCases } from './books.usecases';
import { Book } from '../entities/books.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksUseCases', () => {
  let useCases: BooksUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksUseCases,
        { provide: getRepositoryToken(Book), useValue: Repository },
      ],
    }).compile();

    useCases = module.get<BooksUseCases>(BooksUseCases);
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
