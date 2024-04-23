import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestJob'),
    UsersModule,
    AuthModule,
    ShopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
