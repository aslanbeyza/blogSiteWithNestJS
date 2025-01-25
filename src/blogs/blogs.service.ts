/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createBlog(dto: BlogDto, req: any) {
    const user = await this.userModel.findOne({ email: req.user.email });
    console.log('user', user);
    if (!user) {
      throw new Error('User not found');
    }
    //Bu katmana geldiysek kesinlikle buraya ulasan bi user email vardır kontrolune gerek yok salla

    const newBlog = new this.blogModel({
      title: dto.title,
      content: dto.content,
      sharedBy: user.email,
      userId: user._id /* o kullanıcının mongodb deki id si */,
    });
    console.log('newBlog', newBlog);
    return await newBlog.save();
  }
  /* Napcaz id göndericez bide kullanıcının girmiş oldugu tüm objeyi yollucaz dimi */
  async updateBlog(dto: BlogDto, id: string) {
    return await this.blogModel.findByIdAndUpdate(id, dto, {
      new: true,
    }); /*{new: true} bunu demezsen eski halini döndürür  */
  }
  async removeBlog(id: string) {
    return await this.blogModel.findByIdAndDelete(id);
  }
  async getAllBlogs() {
    return await this.blogModel.find();
  }
  async getCurrentUsersBlog(req:any) {
    const user = await this.userModel.findOne({ email: req.user.email });
    //console.log('user', user);
    //console.log('req.user', req.user);
    if (!user) {
      throw new Error('User not found');
    }
    return await this.blogModel.find({ userId: user._id });
  }

    async getOneBlog(id: string) {
        return await this.blogModel.findById(id);
    }







}
