import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dtos/input/create-user-dto';
import { UpdateUserDto } from './dtos/input/update-user-dto';
import { Auth } from 'src/common/decorators/auth-decorator';

@Controller('users')
export class UsersGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getUsers() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.USERS_SERVICE_URL}/users`),
    );
    return response.data;
  }

  @Get(':id')
  @Auth()
  async getUserById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.USERS_SERVICE_URL}/users/${id}`),
    );
    return response.data;
  }

  @Post()
  @Auth(['ADMIN'])
  async createUser(@Body() createDto: CreateUserDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.USERS_SERVICE_URL}/users`,
        createDto,
      ),
    );
    return response.data;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    const response = await firstValueFrom(
      this.httpService.put(
        `${process.env.USERS_SERVICE_URL}/users/${id}`,
        updateDto,
      ),
    );
    return response.data;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(`${process.env.USERS_SERVICE_URL}/users/${id}`),
    );
    return response.data;
  }
}
