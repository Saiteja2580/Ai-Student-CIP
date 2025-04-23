import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { GeminiService } from 'src/gemini/gemini.service';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './entities/schedule.entity';
import { Model } from 'mongoose';
import { SchedulePrompt } from 'src/prompts/prompt';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly geminiService: GeminiService,
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}

  async createbyForm(createScheduleDto: CreateScheduleDto) {
    // console.log(createScheduleDto);
    let newSchedule = new this.scheduleModel(createScheduleDto);
    newSchedule = await newSchedule.save();
    return newSchedule;
  }

  async createbyPrompt(userPrompt: string, userId: string) {
    const prompt = `
  ${SchedulePrompt}

  Now, process this input and return a JSON object in the same format:
  ${userPrompt}
  `;

    const schedule = await this.geminiService.generateSchedule(prompt);
    let newSchedule = new this.scheduleModel({ ...schedule, userId });
    newSchedule = await newSchedule.save();
    return newSchedule;
  }


  async findByUserId(id: string) {
    return await this.scheduleModel.find({
      userId: id,
    });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return await this.scheduleModel.findByIdAndUpdate(id, updateScheduleDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.scheduleModel.findByIdAndDelete(id);
  }
}
