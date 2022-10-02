import jwt from "jsonwebtoken";

type User = {
  id: number;
  name: string;
  email: string;
  pictureUrl?: string;
};

type jwtPayload = {
  exp: number;
  uat: number;
  user: User;
};

export function jwtPayload(token: string): User {
  const { user } = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as jwtPayload;

  return user;
}
