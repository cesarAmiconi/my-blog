import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  public users: User[] = [];
  create(createUserDto: CreateUserDto): CreateUserDto {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users[id];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.users.splice(id);
    return `This action removes a #${id} user`;
  }
}
