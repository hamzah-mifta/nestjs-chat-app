import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id: mongoose.Types.ObjectId;

  @Prop()
  displayName: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: Date;

  @Prop([String])
  interests: string[];

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
