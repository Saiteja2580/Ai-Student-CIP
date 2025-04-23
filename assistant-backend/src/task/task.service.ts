import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly geminiService: GeminiService,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    //console.log(createTaskDto);
    let newTask = new this.taskModel(createTaskDto);
    newTask = await newTask.save();
    // console.log(newTask);
    return createTaskDto;
  }

  async getTaskByUserId(id: string) {
    return await this.taskModel.find({ userId: id });
  }

  async remove(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async updateStatus(id: string, status: string) {
    console.log(id, status);

    return await this.taskModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}
