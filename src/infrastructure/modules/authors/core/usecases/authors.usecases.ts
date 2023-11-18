import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../../infrastructure/dto/create-author.dto';
import { UpdateAuthorDto } from '../../infrastructure/dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/authors.entity';
import { Book } from '../../../books/core/entities/books.entity';

@Injectable()
export class AuthorsUseCases {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepository.save(createAuthorDto);
  }

  findAll() {
    return this.authorRepository.find();
  }

  findOne(id: string) {
    return this.authorRepository.findOneBy({ id });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const updateResult = await this.authorRepository.update(
      id,
      updateAuthorDto,
    );
    if (updateResult.affected === 0) {
      throw new Error('Author not updated');
    }
    return this.authorRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const deleteResult = await this.authorRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error('Author not deleted');
    }
    return Promise.resolve(true);
  }

  async getBooks(id: string) {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });
    return author.books;
  }

  async overrideBooks(id: string, books: string[]) {
    const author = await this.authorRepository.findOneBy({ id });
    author.books = books.map((authorId) => {
      const bookObj = new Book();
      bookObj.id = authorId;
      return bookObj;
    });
    await this.authorRepository.save(author);
  }

  async editBooks(id: string, books: string[], action: string) {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });

    if (action === 'add') {
      author.books = [
        ...(author.books || []),
        ...books.map((bookId) => {
          const bookObj = new Book();
          bookObj.id = bookId;
          return bookObj;
        }),
      ];
    } else {
      author.books = author.books.filter((book) => !books.includes(book.id));
    }
    console.log(author);
    await this.authorRepository.save(author);
  }
}
