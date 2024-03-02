import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/utils/password.service';
import { ConfigService } from '@nestjs/config';
import { ValidatedUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly paswordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getJwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }

  async validateUser(username: string, pass: string): Promise<ValidatedUser> {
    const user = await this.usersService.findOneByName(username);
    if (
      user &&
      (await this.paswordService.comparePassword(pass, user.password))
    ) {
      return {
        username: user.name,
        userId: user._id,
      };
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  async login(user: ValidatedUser) {
    const payload = {
      username: user.username,
      userId: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
