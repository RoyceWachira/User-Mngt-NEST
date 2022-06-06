import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from '../dtos/users.dto';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../entities/users.schema';
import { CreateLoginDto } from '../dtos/login.dto';
import { AuthService } from '../Auth/auth.service';
import { UserDto } from '../dtos/map.dto';
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
      async findAll(){
          return this.userModel.find();
      }
      async findOne(id:ObjectId){
          const user = await this.userModel.findById({_id:id});
          if(user){
              const newUserDto= new this.mapUserDto(user);
              return newUserDto;
          }else {
              throw new UnauthorizedException('Not found');
          }
      }
      async delete(id:ObjectId){
        const DeleteUser= await this.userModel.findByIdAndRemove({_id:id}).exec();
        return DeleteUser;
    }
    async update(data: CreateUsersDto,id:ObjectId){
        const UpdateUser= await this.userModel.findByIdAndUpdate(id, {...data}, { new : true})
        console.log(UpdateUser)
        return UpdateUser.save();
    }

      mapUserDto (user:User){
          const newUser= new UserDto(user.username,user.usermail,user.usergender,user.userdob,user.Roles)
      } 
}
