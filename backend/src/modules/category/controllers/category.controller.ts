import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateRandomFileName } from 'src/common/helpers/file.helper';
import { AdminAuthGuard } from 'src/guards/admin-auth/admin-auth.guard';


@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @UseGuards(AdminAuthGuard)
    @Get()
    getCategories(@Query('search') search?: string){
        return this.categoryService.getCategories(search);
    }

    @UseGuards(AdminAuthGuard)
    @Post()
    async createCategory(@Body() createCategoryDto:CreateCategoryDto){
        try{
            return await this.categoryService.createCategory(createCategoryDto);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id/posts')
    getPostsByCategoryId(@Param('id') id: string){
        return this.categoryService.findPostsByCategoryId(id);
    }

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
            return await this.categoryService.saveStoredFileAsCategoryCover(id, file);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
