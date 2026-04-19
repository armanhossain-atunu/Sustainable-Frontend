import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      token?: string;
      role: "admin" | "user";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string;
      token?: string;
      role: "admin" | "user";
    };
  }
}
