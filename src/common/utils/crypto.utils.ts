import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
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

  /**
   * Hashes the content of a file using SHA-256.
   * @param buffer - The file buffer to hash.
   * @returns string representing the SHA-256 hash.
   */
  hashFileContent(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex');
  }
}
