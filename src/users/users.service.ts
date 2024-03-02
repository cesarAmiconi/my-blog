import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { PasswordService } from '../utils/password.service';
import { DeleteResult, UpdateResult } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.name = createUserDto.name.toLowerCase();
    createUserDto.password = await this.passwordService.hashPassword(
      createUserDto.password,
    );
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel
      .find()
      .lean()
      .select('-password');
    if (users.length === 0) {
      throw new BadRequestException('No users found');
    }
    return users;
  }

  async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.userModel
        .findById({ _id: id })
        .lean()
        .select('-password');
      if (!user) {
        throw new BadRequestException();
      }
      return user;
    } catch (error) {
      if (error.name === 'BadRequestException') {
        throw new BadRequestException('User not found');
      } else if (error.name === 'CastError') {
        throw new BadRequestException('Invalid user id');
      }
    }
  }

  async isAdmin(id: string): Promise<boolean> {
    return this.findOne(id).then((user) => user.isAdmin);
  }

  async findOneByName(name: string): Promise<any> {
    return this.userModel.findOne({ name: name.toLowerCase() }).lean();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      if (updateUserDto.name) {
        updateUserDto.name = updateUserDto.name.toLowerCase();
      }
      const res: UpdateResult = await this.userModel
        .updateOne({ _id: id }, updateUserDto)
        .lean();
      if (res.matchedCount === 0) {
        throw new BadRequestException('User not found');
      }
      if (res.modifiedCount === 0) {
        throw new BadRequestException('No changes made');
      }
      return res;
    } catch (error) {
      if (error.name === 'BadRequestException') {
        throw new BadRequestException(error.message);
      } else if (error.name === 'CastError') {
        throw new BadRequestException('Invalid data');
      }
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const res: DeleteResult = await this.userModel
        .deleteOne({ _id: id })
        .lean();
      if (res.deletedCount === 0) {
        throw new BadRequestException();
      }
      return res;
    } catch (error) {
      if (error.name === 'BadRequestException') {
        throw new BadRequestException('User not found');
      } else if (error.name === 'CastError') {
        throw new BadRequestException('Invalid user id');
      }
    }
  }
}
