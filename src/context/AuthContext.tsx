import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

import { jwtPayload } from "../utils/jwtPayload";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

type jwtPayload = {
  exp: number;
  uat: number;
  user: User;
};

type User = {
  id: number;
  name: string;
  email: string;
  pictureUrl?: string;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  window.localStorage.removeItem("@Expenseless:token");

  // authChannel.postMessage("signOut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = window.localStorage.getItem("@Expenseless:token");

    if (token) {
      const user = jwtPayload(token);

      setUser(user);
    } else {
      signOut();
    }
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          Router.push("/");
          break;
        default:
          break;
      }
    };
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        window.localStorage.setItem("@Expenseless:token", token);

        const user = jwtPayload(token);
        setUser(user);

        Router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
