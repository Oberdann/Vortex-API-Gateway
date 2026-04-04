import { Controller, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/input/register-dto';
import { LoginDto } from './dto/input/login-dto';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_SERVICE_URL}/register`,
        registerDto,
      ),
    );
    return response.data;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const response = await firstValueFrom(
      this.httpService.post(`${process.env.AUTH_SERVICE_URL}/login`, loginDto),
    );
    return response.data;
  }
}
