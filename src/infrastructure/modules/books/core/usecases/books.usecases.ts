import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../../infrastructure/dto/create-book.dto';
import { UpdateBookDto } from '../../infrastructure/dto/update-book.dto';
import { Book } from '../entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
