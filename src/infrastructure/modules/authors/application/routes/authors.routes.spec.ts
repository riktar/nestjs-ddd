import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsRoutes } from './authors.routes';
import { AuthorsUsecases } from '../../core/usecases/authors.usecases';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../../core/entities/authors.entity';
import { Repository } from 'typeorm';

describe('BooksRoutes', () => {
  let controller: AuthorsRoutes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsRoutes],
      providers: [
        AuthorsUsecases,
        { provide: getRepositoryToken(Author), useValue: Repository },
      ],
    }).compile();

    controller = module.get<AuthorsRoutes>(AuthorsRoutes);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
