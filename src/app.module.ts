import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStratey } from './auth/startegy/jwt.startegy';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/BlogDb'),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStratey],/* Provider'lar, NestJS'in Dependency Injection sistemine entegre edilir ve modüller arası bağımlılıkları çözmek için kullanılır. Provider'lar bir sınıf, değer, fabrika fonksiyonu veya sınıf dışı bir nesne olabilir. */
})
export class AppModule {}
