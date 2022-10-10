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
    const { user } = jwt.decode(token) as jwtPayload;

    return user;
  } catch (error: any) {
    signOut();

    return {} as User;
  }
}
