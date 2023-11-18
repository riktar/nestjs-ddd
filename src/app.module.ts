import { Module } from '@nestjs/common';
import { BooksModule } from './infrastructure/modules/books/books.module';
import { AppRoutes } from './application/routes/app.routes';
import { AppUseCases } from './core/usecases/app.usecases';
import { DB } from './infrastructure/config/db.config';

@Module({
  imports: [DB, BooksModule],
  controllers: [AppRoutes],
  providers: [AppUseCases],
})
export class AppModule {}
