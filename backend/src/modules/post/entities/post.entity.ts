import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema({timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class Post{
    @Prop()
    title: string;
    
    @Prop()
    content: string;

    @Prop()
    content_type: string;
    
    @Prop()
    credits: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
