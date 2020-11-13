import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: String;

  @Prop()
  lastName: String;

  @Prop()
  email: String;

  @Prop()
  password: String;
  
  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);