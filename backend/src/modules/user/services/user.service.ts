import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../entities/role.entity';
import { Model, Types } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto, SignInUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    private salt: number = 10;

    constructor(@InjectModel(Role.name) private roleModel: Model<Role>,
                @InjectModel(User.name) private userModel: Model<User>,
                private jwtService: JwtService) {}

    async findAll(): Promise<User[]>{
        return this.userModel.aggregate([
            {
              $lookup: {
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'role',
              },
            },
            {
              $unwind: '$role',
            },
            {
                $project: {
                  'password': 0,
                }
            },
          ]).exec();
    }

    async createUser({username, email, password, role}: CreateUserDto): Promise<User>{
        const hashedPassword = await bcrypt.hash(password, this.salt);
        const usernameExists = await this.userModel.exists({username});
        const emailExists = await this.userModel.exists({email});
        const user = new this.userModel({username, email, password: hashedPassword, role: new Types.ObjectId(role)});
        if(usernameExists || emailExists)
            throw new Error('Username or Email already exists');
        return user.save();    
    }

    async logIn({username, password}: SignInUserDto){
        const user = await this.userModel.findOne<User>({username});
        
        
        if(user){
            const role = await this.roleModel.findById<Role>(new Types.ObjectId(user.role));
            const isCorrectPassword = await bcrypt.compare(password, user.password);

            if(!isCorrectPassword){
                throw new Error('Password is incorrect, try again!');
            }

            const payload = { username: user.username, role: role.name };
            return {
                user: user,
                role_name: role.name,
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        throw new Error('Username or Email does not exist!');
        
    }

    async findAllRoles(): Promise<Role[]>{
        return this.roleModel.find();
    }
}
