import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  name: String;

  @Prop()
  date: Date

  @Prop()
  url: String

  @Prop()
  user: String
}

export const BoardSchema = SchemaFactory.createForClass(Board);