import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UpdateUserDto } from './dtos/input/update-user-dto';
import { Auth } from 'src/common/decorators/auth-decorator';
import { UserRoles } from 'src/common/enums/user-roles';

@Controller('users')
export class UsersGatewayController {
  constructor(private readonly httpService: HttpService) { }

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

  @Put(':id')
  @Auth()
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ) {
    const isAdmin = request.user.roles.includes(UserRoles.ADMIN);
  
    const isUpdatingOwnProfile = request.user.id === id;

    if (!isAdmin && !isUpdatingOwnProfile) {
      throw new ForbiddenException(
        'Você só pode atualizar o próprio perfil.',
      );
    }

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
