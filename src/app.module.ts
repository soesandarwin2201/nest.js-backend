import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { SalePersonModule } from './sale-person/sale-person.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestJob'),
    UsersModule,
    AuthModule,
    AdminModule,
    SalePersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
