import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  type: Number;

  @Prop()
  description: string;

  @Prop()
  board: string;
  
  @Prop()
  index: Number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);