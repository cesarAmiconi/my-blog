import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userId = context.switchToHttp().getRequest().user.userId;
    const user = await this.usersService.findOne(userId);
    if (user && user.isAdmin) {
      return true;
    }
    throw new ForbiddenException('You are not an admin!');
  }
}
