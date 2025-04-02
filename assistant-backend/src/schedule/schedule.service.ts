import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { GeminiService } from 'src/gemini/gemini.service';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './entities/schedule.entity';
import { Model } from 'mongoose';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly geminiService: GeminiService,
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}

  async createbyForm(createScheduleDto: CreateScheduleDto) {
    console.log(createScheduleDto);
    let newSchedule = new this.scheduleModel(createScheduleDto);
    newSchedule = await newSchedule.save();
    return newSchedule;
  }

  async createbyPrompt(userPrompt: string, userId: string) {
    const prompt = `
  You are an AI assistant that extracts structured data from user input. Given a natural language prompt describing a schedule, extract the relevant details and return a JSON object in the following format:
  category should be ['Meeting','Appointment','Personal','Work'] and Priority will be ['High','Medium','Low'] by default medium

    {
      "name": "string",
      "date": "YYYY-MM-DD",
      "time": "HH:mm",
      "endTime": "HH:mm",
      "category": "string",
      "location": "string",
      "priority": "string"
    }

    Prompt:
      ${userPrompt}    // Directly insert the extracted text here
  `;

    const schedule = await this.geminiService.generateSchedule(prompt);
    let newSchedule = new this.scheduleModel({ ...schedule, userId });
    newSchedule = await newSchedule.save();
    return newSchedule;
  }

  findAll() {
    return `This action returns all schedule`;
  }

  async findOne(id: string) {
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
