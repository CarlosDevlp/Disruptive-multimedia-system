import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, SignInUserDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}
    
    @Get()
    async fetchAll(){
        return this.userService.findAll();
    }

    @Post('login')
    async signIn(@Body() signInUserDto: SignInUserDto){
        try{
            return await this.userService.logIn(signInUserDto);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async signUp(@Body() createUserDto: CreateUserDto){
        try{
            return await this.userService.createUser(createUserDto);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('roles')
    async fetchAllRoles(){
        return this.userService.findAllRoles();
    }

    

}
