import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() req) {
    return this.authservice.login(req.user);
  }
}
