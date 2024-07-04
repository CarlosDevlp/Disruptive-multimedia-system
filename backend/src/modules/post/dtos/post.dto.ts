import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly content_type: string;

  //@IsNotEmpty()
  //@IsString()
  //readonly credits: string;

  @IsNotEmpty()
  readonly user: Types.ObjectId;
  
  @IsNotEmpty()
  readonly category: Types.ObjectId;
}
