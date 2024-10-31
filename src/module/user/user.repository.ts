import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const result = new this.model(data);
    return await result.save();
  }

  async findOne(param: object): Promise<User | null> {
    return this.model.findOne(param).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
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
}
