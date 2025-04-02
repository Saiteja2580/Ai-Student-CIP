import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  dueDate: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date = new Date();
}

export const TaskSchema = SchemaFactory.createForClass(Task);
