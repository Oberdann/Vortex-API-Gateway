import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsGatewayController } from './gateways/products/products.gateway.controller';
import { CategoriesGatewayController } from './gateways/products/categories.gateway.controller';
import { UsersGatewayController } from './gateways/users/users.gateway.controller';
import { HttpServiceModule } from './common/interceptors/http/http-vortex.module';
import { AuthGatewayController } from './gateways/auth/auth.gateway.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategies/jwt-strategy';
@Module({
  imports: [
    HttpModule,
    HttpServiceModule,
    PassportModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    }),
  ],
  controllers: [
    AuthGatewayController,
    ProductsGatewayController,
    CategoriesGatewayController,
    UsersGatewayController,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
