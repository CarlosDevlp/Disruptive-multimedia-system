import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../entities/post.entity';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from '../dtos/post.dto';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CONTENT_TYPES } from 'src/common/models/content-types';
import { promises as fs } from 'fs'; 

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>,
                @InjectModel(Category.name) private categoryModel: Model<Category>,
                @InjectModel(User.name) private userModel: Model<User>) {}

    async getPosts(search?: string): Promise<Post[]>{
        if(search?.trim()){
            return this.postModel.find({title: {$regex: new RegExp(search, 'im') }});
        }
        return this.postModel.find();
    }

    getContentTypes(){
        return Object.values(CONTENT_TYPES);
    }

    async createPost(createPostDto: CreatePostDto): Promise<Post>{
        //const post=new this.postModel(createPostDto);
        const categoryExists = await this.categoryModel.exists({_id: new Types.ObjectId(createPostDto.category)});
        //const userExists = await this.userModel.exists({_id: createPostDto.user});
        const user = await this.userModel.findById<User>(new Types.ObjectId(createPostDto.user)).exec();
        const isContentTypeValid=Object.values(CONTENT_TYPES).find( contentType => contentType == createPostDto.content_type);


        if(!isContentTypeValid) throw Error('Content Type not valid!');  

        if(!categoryExists) throw Error('Category doesn\'t exists!');  
        
        if(user){
            return (new this.postModel({
                ...createPostDto,
                user: new Types.ObjectId(createPostDto.user), 
                category: new Types.ObjectId(createPostDto.category), 
                credits: user.username
            })).save();    
        } 
        throw Error('User doesn\'t exists!');  
    }

    async saveStoredFileAsCategoryCover(postId: string,file: Express.Multer.File){
        const updatedPost = await this.postModel.findByIdAndUpdate(
            new Types.ObjectId(postId),
            { $set: {content: file.path} },
            { new: true },
          );
      
          if (!updatedPost) {
            await fs.unlink(file.path);
            throw new Error('Post doesnt exist with provided Id');
          }

        return updatedPost;
    }
}
