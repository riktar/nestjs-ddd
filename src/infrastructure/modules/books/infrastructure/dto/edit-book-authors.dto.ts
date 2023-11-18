import { IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditBookAuthorsDto {
  @ApiProperty()
  @IsArray()
  authors: string[];

  @ApiProperty({ enum: ['add', 'remove'] })
  @IsEnum(['add', 'remove'])
  action: 'add' | 'remove';
}
