import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { RolesGuard } from '../guards/roles-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(roles: string[] = []) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    SetMetadata('roles', roles),
    ApiBearerAuth('access-token'),
  );
}
