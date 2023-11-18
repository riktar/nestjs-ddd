import { OmitType } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class CreateBookDto extends OmitType(BookDto, ['id'] as const) {}
