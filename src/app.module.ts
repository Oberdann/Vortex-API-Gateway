import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsGatewayController } from './gateways/products/products.gateway.controller';
import { CategoriesGatewayController } from './gateways/products/categories.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductsGatewayController, CategoriesGatewayController],
})
export class AppModule {}
