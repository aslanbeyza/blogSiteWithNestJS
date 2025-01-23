import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
/* burda kullanıcıyı database kısmına kaydetmek istiyoruz  o zaman burda modelini olusturabilirz */
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  /* Body deki herşeyi al ve dto değişkenşne koy diyoruz burada */
  async register(dto:AuthDto){ 
    /* kullanıcnın verdiklerini almak için dto olusturcaz data transfer object */
    const newUser = new this.userModel({
      email: dto.email,
      password: dto.password
    })
    return  await newUser.save();
   }
}
