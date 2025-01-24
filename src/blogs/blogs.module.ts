import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './schemas/blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
/* userı da tanıtmalıyız cunku foreign ya modul olarak calısıyolar */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
