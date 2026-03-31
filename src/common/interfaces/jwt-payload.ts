import { UserRoles } from '../enums/user-roles';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: UserRoles[];
}
