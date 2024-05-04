import { Module } from '@nestjs/common';
import { SalePersonService } from './sale-person.service';
import { SalePersonController } from './sale-person.controller';

@Module({
  providers: [SalePersonService],
  controllers: [SalePersonController]
})
export class SalePersonModule {}
