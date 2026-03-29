import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../enums/user-roles';
import { JwtPayload } from '../interfaces/jwt-payload';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    if (!user || !user.roles) return false;

    if (user.roles.includes(Role.ADMIN)) return true;

    const rolesToCheck: Role[] =
      requiredRoles && requiredRoles.length > 0 ? requiredRoles : [Role.USER];

    return rolesToCheck.some((role) => user.roles.includes(role));
  }
}
