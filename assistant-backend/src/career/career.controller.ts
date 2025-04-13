import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post('ask/:id')
  async getUserQuestion(
    @Body('question') question: string,
    @Param('id') userId: string,
  ) {
    return await this.careerService.getUserQuestion(question, userId);
  }

  @Get('history/:userId')
  async getChatHistory(@Param('userId') userId: string) {
    return await this.careerService.getChatHistory(userId);
  }
}
