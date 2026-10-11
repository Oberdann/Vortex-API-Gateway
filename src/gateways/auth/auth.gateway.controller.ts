import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/input/register-dto';
import { LoginDto } from './dto/input/login-dto';
import { RefreshTokenDto } from './dto/input/refresh-token-dto';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_SERVICE_URL}/auth/register`,
        registerDto,
      ),
    );
    return response.data;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_SERVICE_URL}/auth/login`,
        loginDto,
      ),
    );
    return response.data;
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_SERVICE_URL}/auth/refresh`,
        refreshTokenDto,
      ),
    );

    return response.data;
  }
}
