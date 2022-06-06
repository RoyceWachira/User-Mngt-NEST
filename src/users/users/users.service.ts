import { Injectable } from '@nestjs/common';
import { UsersController } from './users.controller';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from '../dtos/users.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/users.schema';
import { CreateLoginDto } from '../dtos/login.dto';
import { AuthService } from '../Auth/auth.service';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
        private authService:AuthService
        ){}
    
      async create(createUsersDto: CreateUsersDto) {
        const newUser = await this.authService.registerUser(createUsersDto);
        return newUser;
      }
      async login(CreateLoginDto: CreateLoginDto){
          const loggedinUser = await this.authService.loginUser(CreateLoginDto);
          return loggedinUser;
      }
}
