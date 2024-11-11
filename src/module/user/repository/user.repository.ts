import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const result = new this.model(data);
    return await result.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.model.findById(id);
  }

  async findWithProfileById(id: string): Promise<User | null> {
    return this.model
      .findById(id)
      .select('_id email username profile createdAt updatedAt')
      .populate({
        path: 'profile',
        select: '_id displayName birthday interests',
      })
      .exec();
  }

  async findOne(param: object): Promise<User | null> {
    return this.model.findOne(param).exec();
  }

  async isEmailOrUsernameExist(
    email: string | null,
    username: string | null,
  ): Promise<boolean> {
    const filter = {
      $or: [],
    };

    if (email) {
      filter.$or.push({ email });
    }

    if (username) {
      filter.$or.push({ username });
    }

    const user = await this.model.findOne(filter).exec();
    if (!user) {
      return false;
    }

    return true;
  }

  async updateById(id: string, data: Partial<User>): Promise<User | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
