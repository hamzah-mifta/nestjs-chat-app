import * as bcrypt from 'bcrypt';
import configuration from 'src/config/configuration';

export class CryptoUtil {
  private saltRounds: number;

  constructor() {
    const config = configuration();
    this.saltRounds = config.crypto.saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
