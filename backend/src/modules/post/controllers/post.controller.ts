import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateRandomFileName } from 'src/common/helpers/file.helper';
import { CreatorAuthGuard } from 'src/guards/creator-auth/creator-auth.guard';

@Controller('posts')
export class PostController {
    
    constructor(private postService: PostService){}
    
    @Get()
    async getPosts(@Query('search') search?: string){
        return this.postService.getPosts(search);
    }

    @Get('content-types')
    async getContentTypes(){
        return this.postService.getContentTypes();
    }

    @UseGuards(CreatorAuthGuard)
    @Post()
    async createPost(@Body() createPostDto:CreatePostDto){
        try{
            return await this.postService.createPost(createPostDto);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(CreatorAuthGuard)
    @Post(':id/file')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './public/uploads',
                filename: generateRandomFileName,
            }),
        }
    ))
    async uploadFile(@Param('id') id: string, 
                     @UploadedFile() file: Express.Multer.File){
        try{
            return await this.postService.saveStoredFileAsCategoryCover(id, file);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
