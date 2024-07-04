import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    PostModule,
    MongooseModule.forRoot('mongodb://localhost:27017/disruptive'),
    JwtModule.register({
      global: true,
      secret: '41d39961310cd8597ae7207177eb08b526e834dd84fa505bc9d2dc2ff0291c92',
      signOptions: { expiresIn: '5d' },
    })
    /*MulterModule.register({
      dest:  join(__dirname, '..', 'public', 'uploads'),
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '..', 'public', 'uploads'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
