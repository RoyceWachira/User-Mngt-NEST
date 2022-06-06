import { UsersService } from "../users/users.service";
import { UsersController } from "../users/users.controller";
import { Injectable } from "@nestjs/common";
import { CreateLoginDto } from "../dtos/login.dto";
import { CreateUsersDto, Roles } from "../dtos/users.dto";


@Injectable()
export class AuthService{
    
}