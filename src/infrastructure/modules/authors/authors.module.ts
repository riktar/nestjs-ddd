import { Module } from '@nestjs/common';
import { AuthorsRoutes } from './application/routes/authors.routes';
import { AuthorsUseCases } from './core/usecases/authors.usecases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './core/entities/authors.entity';

const AuthorsRepository = TypeOrmModule.forFeature([Author]);

@Module({
  imports: [AuthorsRepository],
  controllers: [AuthorsRoutes],
  providers: [AuthorsUseCases],
  exports: [AuthorsUseCases, AuthorsRepository],
})
export class AuthorsModule {}
