import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema()
export class User{
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    
    @Prop({ type: Types.ObjectId, ref: 'Role' })
    role: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
