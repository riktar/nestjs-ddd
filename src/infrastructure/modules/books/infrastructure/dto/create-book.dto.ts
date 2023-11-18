import { OmitType } from '@nestjs/swagger';
import { Book } from '../../core/entities/books.entity';

export class CreateBookDto extends OmitType(Book, ['id'] as const) {}
