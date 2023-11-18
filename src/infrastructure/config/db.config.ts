import { TypeOrmModule } from '@nestjs/typeorm';

export const DB = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5455,
  username: 'root',
  password: 'root',
  database: 'test',
  autoLoadEntities: true,
  synchronize: true, // only in TEST or DEVELOPMENT
});

export const DBForTest = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5455,
  username: 'root',
  password: 'root',
  database: 'test',
  autoLoadEntities: true,
  synchronize: true, // only in TEST or DEVELOPMENT
});
