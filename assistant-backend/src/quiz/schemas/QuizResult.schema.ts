import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
@Schema()
export class QuizResult extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true })
  fileId: File;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  percentage: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuizResultSchema = SchemaFactory.createForClass(QuizResult);
