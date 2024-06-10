import { Request } from 'express';
import { Role } from './role.enum';

export type JwtPayload = {
  sub: string;
  username: string;
  role: Role;
  iat: number;
  exp: number;
};

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
