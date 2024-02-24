import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export class PasswordService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }
  comparePassword(newPassword: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }
}
