import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsString()
    readonly cover_image: string;
  
    @IsNotEmpty()
    @IsBoolean()
    readonly allows_images: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    readonly allows_youtube_videos: boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly allows_documents: boolean;        
}
  