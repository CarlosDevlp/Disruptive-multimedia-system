import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema()
export class Category{
    @Prop()
    name: string;
    @Prop()
    cover_image: string;
    @Prop()
    allows_images: boolean;
    @Prop()
    allows_youtube_videos: boolean;
    @Prop()
    allows_documents: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
