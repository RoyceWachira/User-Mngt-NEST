import { UsersService } from "../users/users.service";
import { UsersController } from "../users/users.controller";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateLoginDto } from "../dtos/login.dto";
import { CreateUsersDto, Roles } from "../dtos/users.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../entities/users.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService{
    constructor (@InjectModel(User.name) private userModel:Model<UserDocument>){
    
    }
    async registerUser(createUsersDto: CreateUsersDto) {
        const emailExists= await this.userModel.findOne({usermail:createUsersDto.usermail});
        if(emailExists){
            throw new UnauthorizedException("Please use a different email address")
        }
        createUsersDto.Role=[Roles.User];
        const round=10;
        const hashedpassword= await bcrypt.hash(createUsersDto.password,round);
        
        const user={
            Name:createUsersDto.username,
            Email:createUsersDto.usermail,
            Password:createUsersDto.password,
            DoB:createUsersDto.userdob,
            Gender:createUsersDto.usergender,
            Role:createUsersDto.Role
        }
        const def='admin1';

        const adminpass= await bcrypt.hash(def,round);
        
        const admin={
            Name:"Admin1",
            Email:"wachh@gmail.com",
            Password:adminpass,
            DoB:null,
            Gender:null,
            Role:[Roles.Admin]
        }
        const adminExists= await this.userModel.findOne({usermail:admin.Email});
        if(!adminExists){
            const newAdmin= new this.userModel(admin);
            console.log("Admin Created");
            newAdmin.save();
        }
        const newUser=new this.userModel(user);
        const saveUser= await newUser.save();
        const payload={ sub:saveUser._id,mail:saveUser.usermail,role:saveUser.Roles}
        
    }
    async loginUser(CreateLoginDto: CreateLoginDto) {
        const userExists= await this.findByMail(CreateLoginDto.usermail);
        const comparepass= await bcrypt.compare(CreateLoginDto.password, userExists.password);
        if(!comparepass){
            throw new UnauthorizedException("Incorrect login details!");

        }
        const payload={ sub:userExists._id,mail:userExists.usermail,role:userExists.Roles}
    }
    async findByMail(usermail:string){
        const emailExists= await this.userModel.findOne({usermail:usermail});
        if (!emailExists){
            throw new NotFoundException("User does not exist");
        }
        return emailExists;
    }
}