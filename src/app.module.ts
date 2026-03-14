import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsGatewayController } from './gateways/products/products.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductsGatewayController],
})
export class AppModule {}
