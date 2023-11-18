import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppUseCases } from '../../core/usecases/app.usecases';

@Controller('')
export class AppRoutes {
  constructor(private readonly appUseCases: AppUseCases) {}
  @Get()
  @ApiTags('Application')
  @ApiOperation({
    summary: 'Hello World',
    description: 'Hello World',
  })
  @ApiOkResponse({ type: String, description: 'Hello World' })
  hello() {
    return this.appUseCases.helloWorld();
  }
}
