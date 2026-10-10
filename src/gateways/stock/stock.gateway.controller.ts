import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateStockDto } from './dtos/input/create-stock-dto';
import { StockBatchDto } from './dtos/input/stock-batch-dto';
import { UpdateStockDto } from './dtos/input/update-stock-dto';

@Controller('stock')
export class StockGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async create(@Body() stock: CreateStockDto) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.STOCK_SERVICE_URL}/stock`, stock),
    );

    return response.data;
  }

  @Post('batch')
  async getBatch(@Body() stockIds: StockBatchDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.STOCK_SERVICE_URL}/stock/batch`,
        stockIds,
      ),
    );

    return response.data;
  }

  @Get(':productId')
  async getById(@Param('productId') productId: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.STOCK_SERVICE_URL}/stock/${productId}`,
      ),
    );

    return response.data;
  }

  @Put(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() stock: UpdateStockDto,
  ) {
    const response = await firstValueFrom(
      this.httpService.put(
        `${process.env.STOCK_SERVICE_URL}/stock/${productId}`,
        stock,
      ),
    );

    return response.data;
  }
}
