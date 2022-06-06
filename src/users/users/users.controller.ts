import { Controller, Post ,Body } from '@nestjs/common';
import { CreateUsersDto } from '../dtos/users.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}
    }

