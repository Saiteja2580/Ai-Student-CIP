import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { TextScheduleDto } from './dto/text-schedule.dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('schedule')
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('add-schedule-form')
  createbyForm(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.createbyForm(createScheduleDto);
  }

  @Post('add-schedule-text')
  createByPrompt(@Body(ValidationPipe) prompt: TextScheduleDto) {
    return this.scheduleService.createbyPrompt(prompt.prompt, prompt.userId);
  }

  @Get(':id')
  findByUserId(@Param('id') id: string) {
    return this.scheduleService.findByUserId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
