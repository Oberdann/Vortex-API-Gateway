import { Role } from '../enums/user-roles';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Role[];
}
