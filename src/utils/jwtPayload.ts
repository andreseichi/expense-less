import jwt from "jsonwebtoken";
import { signOut } from "../context/AuthContext";

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
  try {
    console.log(String(process.env.JWT_SECRET));
    const { user } = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as jwtPayload;

    return user;
  } catch (error: any) {
    signOut();

    return {} as User;
  }
}
