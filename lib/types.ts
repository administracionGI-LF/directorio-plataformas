export type Brand = "lungfung" | "golden";
export type Role = "admin" | "viewer";

export interface Platform {
  id: string;
  name: string;
  brand: Brand;
  link: string;
  linkPassword: string;
  active: boolean;
  position: number;
}

export interface AppUser {
  id: string;
  username: string;
  password_hash: string;
  role: Role;
  created_at: string;
}

export interface SessionPayload {
  sub: string;
  username: string;
  role: Role;
}
