import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class File extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  filetype: string;

  @Prop({ required: true })
  extractedText: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
