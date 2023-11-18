import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../../infrastructure/dto/create-book.dto';
import { UpdateBookDto } from '../../infrastructure/dto/update-book.dto';
import { Book } from '../entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../../authors/core/entities/authors.entity';

@Injectable()
export class BooksUseCases {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: string) {
    return this.bookRepository.findOneBy({ id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updateResult = await this.bookRepository.update(id, updateBookDto);
    if (updateResult.affected === 0) {
      throw new Error('Book not updated');
    }
    return this.bookRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const deleteResult = await this.bookRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error('Book not deleted');
    }
    return Promise.resolve(true);
  }

  async getAuthors(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { authors: true },
    });
    return book.authors;
  }

  async overrideAuthors(id: string, authors: string[]) {
    const book = await this.bookRepository.findOneBy({ id });
    book.authors = authors.map((authorId) => {
      const authorObj = new Author();
      authorObj.id = authorId;
      return authorObj;
    });
    console.log(book);
    const saved = await this.bookRepository.save(book);
    console.log(saved);
  }

  async editAuthors(id: string, authors: string[], action: string) {
    const book = await this.bookRepository.findOne({
      relations: { authors: true },
      where: { id },
    });
    if (action === 'add') {
      book.authors = [
        ...book.authors,
        ...authors.map((authorId) => {
          const authorObj = new Author();
          authorObj.id = authorId;
          return authorObj;
        }),
      ];
    } else {
      book.authors = book.authors.filter(
        (author) => !authors.includes(author.id),
      );
    }
    await this.bookRepository.save(book);
  }
}
