import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getProducts() {
    const response = await firstValueFrom(
      this.httpService.get('http://products-service:3002/api/v1'),
    );

    return { message: 'Teste', data: response.data };
  }
}
