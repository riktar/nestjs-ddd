import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { BooksUseCases } from '../../core/usecases/books.usecases';
import { CreateBookDto } from '../../infrastructure/dto/create-book.dto';
import { UpdateBookDto } from '../../infrastructure/dto/update-book.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from '../../core/entities/books.entity';

@Controller('books')
export class BooksRoutes {
  constructor(private readonly booksUseCases: BooksUseCases) {}

  @Post()
  @ApiTags('books')
  @ApiCreatedResponse({ type: Book, description: 'Book created' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksUseCases.create(createBookDto);
  }

  @Get()
  @ApiTags('books')
  @ApiOkResponse({ type: [Book], description: 'Books found' })
  findAll() {
    return this.booksUseCases.findAll();
  }

  @Get(':id')
  @ApiTags('books')
  @ApiOkResponse({ type: Book, description: 'Book found' })
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksUseCases.findOne(id);
  }

  @Patch(':id')
  @ApiTags('books')
  @ApiOkResponse({ type: Book, description: 'Book updated' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksUseCases.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiTags('books')
  @ApiNoContentResponse({ description: 'Book deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.booksUseCases.remove(id);
    return Promise.resolve();
  }
}
