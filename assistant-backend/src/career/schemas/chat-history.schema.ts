import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatHistory extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ChatHistorySchema = SchemaFactory.createForClass(ChatHistory);
