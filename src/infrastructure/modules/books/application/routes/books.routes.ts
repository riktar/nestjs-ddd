import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BooksUseCases } from '../../core/usecases/books.usecases';
import { CreateBookDto } from '../../infrastructure/dto/create-book.dto';
import { UpdateBookDto } from '../../infrastructure/dto/update-book.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BookDto } from '../../infrastructure/dto/book.dto';
import { EditBookAuthorsDto } from '../../infrastructure/dto/edit-book-authors.dto';
import { AuthorDto } from '../../../authors/infrastructure/dto/author.dto';

@Controller('books')
@ApiTags('Books')
export class BooksRoutes {
  constructor(private readonly booksUseCases: BooksUseCases) {}

  @Post()
  @ApiOperation({
    summary: 'Create a book',
    description: 'Create a book with the given data',
  })
  @ApiCreatedResponse({ type: BookDto, description: 'Book created' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksUseCases.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all books',
    description: 'Get all books',
  })
  @ApiOkResponse({ type: [BookDto], description: 'Books found' })
  findAll() {
    return this.booksUseCases.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a book',
    description: 'Get a book with the given id',
  })
  @ApiOkResponse({ type: BookDto, description: 'Book found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksUseCases.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a book',
    description: 'Update a book with the given data',
  })
  @ApiOkResponse({ type: BookDto, description: 'Book updated' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksUseCases.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a book',
    description: 'Delete a book with the given id',
  })
  @ApiNoContentResponse({ description: 'Book deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.booksUseCases.remove(id);
    return Promise.resolve();
  }

  @Get(':id/authors')
  @ApiOperation({
    summary: 'Get authors of a book',
    description: 'Get authors of a book with the given id',
  })
  @ApiOkResponse({ description: 'Author', type: [AuthorDto] })
  getBooks(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksUseCases.getAuthors(id);
  }

  @Put(':id/authors')
  @ApiOperation({
    summary: 'Override authors of a book',
    description: 'Override all the existent authors with the new array',
  })
  @ApiOkResponse({ description: 'Book updated' })
  async overrideAuthors(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() authors: string[],
  ) {
    await this.booksUseCases.overrideAuthors(id, authors);
    return Promise.resolve();
  }

  @Patch(':id/authors')
  @ApiOperation({
    summary: 'Edit authors of a book',
    description: 'Edit the authors to the existent array',
  })
  @ApiNoContentResponse({ description: 'Book updated' })
  async editAuthors(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() authorsToUpdate: EditBookAuthorsDto,
  ) {
    await this.booksUseCases.editAuthors(
      id,
      authorsToUpdate.authors,
      authorsToUpdate.action,
    );
    return Promise.resolve();
  }
}
