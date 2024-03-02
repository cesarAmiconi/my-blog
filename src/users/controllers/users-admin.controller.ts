import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteResult } from 'mongodb';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin')
export class UsersAdminController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }
}
