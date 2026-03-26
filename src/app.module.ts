import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsGatewayController } from './gateways/products/products.gateway.controller';
import { CategoriesGatewayController } from './gateways/products/categories.gateway.controller';
import { UsersGatewayController } from './gateways/users/users.gateway.controller';
import { HttpServiceModule } from './common/interceptors/http/http-vortex.module';

@Module({
  imports: [HttpModule, HttpServiceModule],
  controllers: [
    ProductsGatewayController,
    CategoriesGatewayController,
    UsersGatewayController,
  ],
})
export class AppModule {}
