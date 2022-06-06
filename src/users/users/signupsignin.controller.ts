import { Body, Controller,UnauthorizedException,Post} from "@nestjs/common";
import { CreateUsersDto } from "../dtos/users.dto";
import { CreateLoginDto } from "../dtos/login.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class SignupsigninController{
    constructor(private UsersService:UsersService){}

    @Post('register')
    async register(@Body() CreateUsersDto:CreateUsersDto){
         const CheckMail= this.ValidateEmail(CreateUsersDto.usermail);
         if(CheckMail==false){
             throw new UnauthorizedException("Please Enter a Valid Email");
         }
         if(CreateUsersDto.username ||CreateUsersDto.password || CreateUsersDto.confirmpassword ||CreateUsersDto.userdob ||CreateUsersDto.usergender ||CreateUsersDto.usermail){
            throw new UnauthorizedException("Please fill in all fields");
         }
         if(CreateUsersDto.confirmpassword !== CreateUsersDto.password){
            throw new UnauthorizedException("Passwords do not match");
         }
         return await this.UsersService.create(CreateUsersDto);
    }
    @Post('login')
    async login(@Body() CreateLoginDto:CreateLoginDto){
        const CheckMail= this.ValidateEmail(CreateLoginDto.usermail);
        if (!CreateLoginDto.password|| !CreateLoginDto.usermail){
           throw new UnauthorizedException("Fill in all required Fields");
        }
        return await this.UsersService.login(CreateLoginDto);
    }
    ValidateEmail(usermail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usermail)){
          return true;
        } else {
          return false;
        }

    }
}