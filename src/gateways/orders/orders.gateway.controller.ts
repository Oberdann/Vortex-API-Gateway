import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async create(@Body() input: CreateOrderDto) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.ORDERS_SERVICE_URL}/orders`, input),
    );
    return response.data;
  }

  @Get(':orderId')
  async getById(@Param('orderId') orderId: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.ORDERS_SERVICE_URL}/orders/${encodeURIComponent(orderId)}`,
      ),
    );
    return response.data;
  }
}
