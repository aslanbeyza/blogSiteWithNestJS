import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule,  } from '@nestjs/jwt';

/* import kısmı schema ile ilgili kısımların import edilmesi gerekmektedir. */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({secret:"beyzoşş",signOptions:{expiresIn:'1h'}})
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
