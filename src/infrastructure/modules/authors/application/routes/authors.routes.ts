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
import { AuthorsUseCases } from '../../core/usecases/authors.usecases';
import { CreateAuthorDto } from '../../infrastructure/dto/create-author.dto';
import { UpdateAuthorDto } from '../../infrastructure/dto/update-author.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorDto } from '../../infrastructure/dto/author.dto';
import { EditBookAuthorsDto } from '../../infrastructure/dto/edit-book-authors.dto';
import { BookDto } from '../../../books/infrastructure/dto/book.dto';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsRoutes {
  constructor(private readonly authorsUseCases: AuthorsUseCases) {}

  @Post()
  @ApiOperation({
    summary: 'Create an author',
    description: 'Create an author with the given data',
  })
  @ApiCreatedResponse({ type: AuthorDto, description: 'Author created' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsUseCases.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all authors',
    description: 'Get all authors',
  })
  @ApiOkResponse({ type: [AuthorDto], description: 'Authors found' })
  findAll() {
    return this.authorsUseCases.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an author',
    description: 'Get an author with the given id',
  })
  @ApiOkResponse({ type: AuthorDto, description: 'Author found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authorsUseCases.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an author',
    description: 'Update an author with the given data',
  })
  @ApiOkResponse({ type: AuthorDto, description: 'Author updated' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsUseCases.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an author',
    description: 'Delete an author with the given id',
  })
  @ApiNoContentResponse({ description: 'Author deleted' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.authorsUseCases.remove(id);
    return Promise.resolve();
  }

  @Get(':id/books')
  @ApiOperation({
    summary: 'Get books of an author',
    description: 'Get books of an author with the given id',
  })
  @ApiOkResponse({ description: 'Author', type: [BookDto] })
  getBooks(@Param('id', ParseUUIDPipe) id: string) {
    return this.authorsUseCases.getBooks(id);
  }

  @Put(':id/books')
  @ApiOperation({
    summary: 'Override books of an author',
    description: 'Override all the existent books with the new array',
  })
  @ApiOkResponse({ description: 'Book updated' })
  async overrideBooks(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() books: string[],
  ) {
    await this.authorsUseCases.overrideBooks(id, books);
    return Promise.resolve();
  }

  @Patch(':id/books')
  @ApiOperation({
    summary: 'Edit books of an author',
    description: 'Edit the books to the existent array',
  })
  @ApiNoContentResponse({ description: 'Author updated' })
  async editBooks(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() authorsToUpdate: EditBookAuthorsDto,
  ) {
    await this.authorsUseCases.editBooks(
      id,
      authorsToUpdate.books,
      authorsToUpdate.action,
    );
    return Promise.resolve();
  }
}
