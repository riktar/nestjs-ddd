import { Injectable } from '@nestjs/common';

@Injectable()
export class AppUseCases {
  helloWorld() {
    return 'Hello World!';
  }
}
