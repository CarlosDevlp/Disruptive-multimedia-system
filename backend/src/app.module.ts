import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    CategoryModule,
    PostModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5d' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
