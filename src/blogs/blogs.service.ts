import { Injectable } from '@nestjs/common';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDto } from './dto/blog.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
/* blogModel kullanarak  db işlemlerini yapıcaz  dto oluşturup yollaman lazım*/
export class BlogsService {
       constructor(
       @InjectModel(Blog.name) private blogModel:Model<BlogDocument>,
       @InjectModel(User.name) private userModel:Model<UserDocument>,

    ) {}
   async createBlog( dto:BlogDto, req: { user: { email: string } } ){
       const user = await this.userModel.findById(req.user.email);
       console.log('user', user);
       if (!user) {
           throw new Error('User not found');
       }
       //Bu katmana geldiysek kesinlikle buraya ulasan bi user email vardır kontrolune gerek yok salla
        
        const newBlog = new this.blogModel(
            {
                title: dto.title,
                content: dto.content,
                sharedBy: user.email,
                userId: user._id, /* o kullanıcının mongodb deki id si */
            }    
        );
        const blog = await newBlog.save();
        console.log('blog', blog);
        return blog;
    }   
}