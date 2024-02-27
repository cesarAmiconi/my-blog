import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { PasswordService } from './utils/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.passwordService.hashPassword(
      createUserDto.password,
    );
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById({ _id: id }).lean();
  }

  async findOneByName(name: string): Promise<any> {
    return this.userModel.findOne({ name: name }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.updateOne({ _id: id }, updateUserDto).lean();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.deleteOne({ _id: id }).lean();
  }
}
