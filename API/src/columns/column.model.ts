import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ColumnDocument = Column & Document;

@Schema()
export class Column {
  @Prop()
  value: Number;

  @Prop()
  label: string;

  @Prop()
  color: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);