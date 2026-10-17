import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Controller('payments')
export class PaymentsGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get('order/:orderId')
  async getByOrderId(@Param('orderId') orderId: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.PAYMENTS_SERVICE_URL}/payments/order/${encodeURIComponent(orderId)}`,
      ),
    );
    return response.data;
  }

  @Post()
  @HttpCode(201)
  @ApiHeader({
    name: 'X-Idempotency-Key',
    required: true,
    description:
      'UUID único para esta tentativa; reutilize-o ao repetir a mesma requisição.',
  })
  async create(
    @Body() input: CreatePaymentDto,
    @Headers('x-idempotency-key') idempotencyKey: string | undefined,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.PAYMENTS_SERVICE_URL}/payments`,
        input,
        { headers: { 'X-Idempotency-Key': idempotencyKey } },
      ),
    );
    return response.data;
  }
}
