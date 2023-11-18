import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppUseCases } from '../../core/usecases/app.usecases';

@Controller('')
export class AppRoutes {
  constructor(private readonly appUseCases: AppUseCases) {}

  @Get()
  @ApiTags('default')
  @ApiOkResponse({ type: String, description: 'Hello World' })
  hello() {
    return this.appUseCases.helloWorld();
  }
}
