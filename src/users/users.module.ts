import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PasswordService } from '../utils/password.service';
import { UsersAdminController } from './controllers/users-admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, UsersAdminController],
  providers: [UsersService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
