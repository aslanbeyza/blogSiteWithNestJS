import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import *as bcrypt from 'bcrypt';
import {JwtService } from '@nestjs/jwt';

@Injectable()
/* burda kullanıcıyı database kısmına kaydetmek istiyoruz  o zaman burda modelini olusturabilirz */
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private jwtService:JwtService){}
  /* Body deki herşeyi al ve dto değişkenşne koy diyoruz burada */
  async register(dto:AuthDto){ 
    /* kullanıcnın verdiklerini almak için dto olusturcaz data transfer object */
    /* burda kullanıcıya verdiği şifreyi hashlemek istiyoruz */
    const hashadPass = await bcrypt.hash(dto.password,10);
    const newUser = new this.userModel({
      email: dto.email,
      password: hashadPass,
    })
    const user = await newUser.save();
    return   this.createToken(user.email);   /* tokenda olcak şeyler bunlar payload */
   }
   /* token döndürelim sadece register ve login olan kişiler alabilsin bu tokenı bunun içinde  npm install --save @nestjs/jwt  auth modulde importunu yapman*/
   /* tokenın  olayı şu aslında; websitesinde bazı linkler herkese erişilebilir olmamalı profile sadece giriş yapanlar olmalı gibi gibi giriş yapmayanın tüm bloglarını dilebildiğini düşünsene çok kötü bişey bu kendi routekarına göre olmalı verification olmalı yani*/
    createToken(email:string){
      return this.jwtService.sign({email:email});
    }

    async login(dto:AuthDto){
      const user = await this.userModel.findOne({email:dto.email}); /* dbde varmı email varsa true olcak yoksa false olcak */
      console.log(user);
      if(!user)throw new UnauthorizedException('user not found');
      const isMatch = await bcrypt.compare(dto.password,user.password);
      if(!isMatch)throw new UnauthorizedException('wrong password');
      return this.createToken(user.email);
    }
    
}
