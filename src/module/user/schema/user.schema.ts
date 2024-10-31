import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { Profile } from './profile.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  // profile: Profile;

  @Prop({ required: true })
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
