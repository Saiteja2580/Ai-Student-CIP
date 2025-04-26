import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CareerService } from './career.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('career')
@UseGuards(AuthGuard)
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post('ask/:id')
  async getUserQuestion(
    @Body('question') question: string,
    @Param('id') userId: string,
  ) {
    console.log(question, userId);

    return await this.careerService.getUserQuestion(question, userId);
  }

  @Get('history/:userId')
  async getChatHistory(@Param('userId') userId: string) {
    return await this.careerService.getChatHistory(userId);
  }

  @Get('roadmap/:topic')
  async getRoadmap(@Param('topic') topic: string) {
    return await this.careerService.getRoadmap(topic);
  }
}
