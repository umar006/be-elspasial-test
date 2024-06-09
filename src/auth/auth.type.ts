import { Request } from 'express';

export type JwtPayload = {
  sub: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
};

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
