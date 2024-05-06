import { Controller, Post , Body, Get, Query,   ParseIntPipe,Request} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalePersonService } from './sale-person.service';
import { SuccessResponse } from 'src/utility/constant/Response.input';
import { SalePersonSignInInput } from './input/saleperson-signIn.input';
import { SalePerson } from './models/saleperson.model';

@ApiTags('SalePerson')
@Controller('sale-person')
export class SalePersonController {
   constructor(readonly saleService: SalePersonService){}

   @Post('sale-signIn')
   async salePersonSignIn(@Body() input: SalePersonSignInInput):Promise<SuccessResponse>{
      return this.saleService.salePersonSignIn(input)
   }

   @Get('getAllSalePerson')
  async getAllMarkets(
    @Query('offset', new ParseIntPipe()) offset: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Request() req: any,
  ): Promise<SalePerson[]> {
   console.log(req, "to check the re of get all markets")
    const adminId = req.adminId;
    return await this.saleService.getAllSalePerson(adminId,offset,limit);
  }


}
