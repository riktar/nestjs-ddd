import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsUsecases } from './authors.usecases';
import { Author } from '../entities/authors.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksUseCases', () => {
  let useCases: AuthorsUsecases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsUsecases,
        { provide: getRepositoryToken(Author), useValue: Repository },
      ],
    }).compile();

    useCases = module.get<AuthorsUsecases>(AuthorsUsecases);
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
