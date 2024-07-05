import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../entities/category.entity';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from '../dtos/category.dto';
import { CONTENT_TYPES } from 'src/common/models/content-types';
import { promises as fs } from 'fs'; 
import { Post } from 'src/modules/post/entities/post.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>,
                @InjectModel(Post.name) private postModel: Model<Post>){}
    
    async getCategories(search?:string):Promise<Category[]>{
        if(search?.trim()){
            return this.categoryModel.find({name: {$regex: new RegExp(search, 'im') }});
        }
        return this.categoryModel.find();
    }

    getCategory(categoryId:string):Promise<Category>{
        return this.categoryModel.findById(new Types.ObjectId(categoryId));
    }

    findPostsByCategoryId(categoryId: string):Promise<Post[]>{
        return this.postModel.find({ category: new Types.ObjectId(categoryId)});
    }

    async createCategory(createCategoryDto: CreateCategoryDto):Promise<Category>{
        const category=new this.categoryModel(createCategoryDto);
        if(await this.categoryModel.exists({name: createCategoryDto.name})){
            throw Error('Category already exists!');    
        }
        return category.save();
    }

    async categoryExists(req, file , cb){
        const id= req.params.id || '';
        const categoryExists= await this.categoryModel.exists({_id: new Types.ObjectId(id)});
        /*if (!req.params.id) {
            return cb(new Error('Missing required id parameter in request path'), false);
        }*/
       console.log('checking if categoryExists');
        if(categoryExists){
            cb(null, true);
        }
        return cb(new Error('Category doesnt exist with provided ID'), false);
    }

    async saveStoredFileAsCategoryCover(categoryId: string,file: Express.Multer.File){
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(
            new Types.ObjectId(categoryId),
            { $set: {cover_image: file.path} },
            { new: true },
          );
      
          if (!updatedCategory) {
            await fs.unlink(file.path);
            throw new Error('Category doesnt exist with provided Id');
          }

        return updatedCategory;
    }

}
