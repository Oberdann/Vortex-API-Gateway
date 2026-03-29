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
        `http://localhost:3001/api/v1/auth/register`,
        registerDto,
      ),
    );
    return response.data;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `http://localhost:3001/api/v1/auth/login`,
        loginDto,
      ),
    );
    return response.data;
  }
}
