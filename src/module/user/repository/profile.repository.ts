import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from '../schema/profile.schema';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(Profile.name) private model: Model<ProfileDocument>,
  ) {}

  async create(data: Partial<Profile>): Promise<Profile> {
    const profile = new this.model(data);
    return profile.save();
  }

  async findById(id: string): Promise<Profile> {
    return this.model.findById(id);
  }

  async updateById(id: string, data: Partial<Profile>): Promise<Profile> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async upsert(id: string | null, data: Partial<Profile>): Promise<Profile> {
    return this.model
      .findOneAndUpdate(
        { _id: id ? new Types.ObjectId(id) : new Types.ObjectId() },
        { $set: data },
        { new: true, upsert: true },
      )
      .exec();
  }
}
