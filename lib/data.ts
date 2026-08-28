import "server-only";
import { supabaseServer } from "./supabase-server";
import type { AppUser, Platform } from "./types";

type PgResult<T> = { data: T | null; error: { message: string } | null };

function check(res: PgResult<unknown>): void {
  if (res.error) throw new Error(res.error.message);
}

// ---- platforms ----

export async function listPlatforms(): Promise<Platform[]> {
  const res = (await supabaseServer()
    .from("platforms")
    .select("id,name,brand,link,linkPassword:link_password,active,position")
    .order("position", { ascending: true })) as PgResult<Platform[]>;
  check(res);
  return res.data ?? [];
}

export async function createPlatform(input: {
  name: string;
  brand: Platform["brand"];
  link: string;
  linkPassword: string;
  active: boolean;
}): Promise<void> {
  const db = supabaseServer();
  const maxRes = (await db
    .from("platforms")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle()) as PgResult<{ position: number }>;
  const nextPosition = (maxRes.data?.position ?? 0) + 1;
  const res = (await db.from("platforms").insert({
    name: input.name,
    brand: input.brand,
    link: input.link,
    link_password: input.linkPassword,
    active: input.active,
    position: nextPosition,
  })) as PgResult<null>;
  check(res);
}

export async function updatePlatform(
  id: string,
  input: {
    name: string;
    brand: Platform["brand"];
    link: string;
    linkPassword: string;
    active: boolean;
  }
): Promise<void> {
  const res = (await supabaseServer()
    .from("platforms")
    .update({
      name: input.name,
      brand: input.brand,
      link: input.link,
      link_password: input.linkPassword,
      active: input.active,
    })
    .eq("id", id)) as PgResult<null>;
  check(res);
}

export async function deletePlatform(id: string): Promise<void> {
  const res = (await supabaseServer().from("platforms").delete().eq("id", id)) as PgResult<null>;
  check(res);
}

export async function togglePlatformActive(id: string): Promise<void> {
  const db = supabaseServer();
  const current = (await db
    .from("platforms")
    .select("active")
    .eq("id", id)
    .maybeSingle()) as PgResult<{ active: boolean }>;
  check(current);
  if (!current.data) return;
  const res = (await db
    .from("platforms")
    .update({ active: !current.data.active })
    .eq("id", id)) as PgResult<null>;
  check(res);
}

export async function movePlatform(id: string, direction: "up" | "down"): Promise<void> {
  const all = await listPlatforms();
  const idx = all.findIndex((p) => p.id === id);
  if (idx < 0) return;
  const brand = all[idx].brand;
  let swapIdx = -1;
  if (direction === "up") {
    for (let i = idx - 1; i >= 0; i--) {
      if (all[i].brand === brand) {
        swapIdx = i;
        break;
      }
    }
  } else {
    for (let i = idx + 1; i < all.length; i++) {
      if (all[i].brand === brand) {
        swapIdx = i;
        break;
      }
    }
  }
  if (swapIdx === -1) return;
  const a = all[idx];
  const b = all[swapIdx];
  const db = supabaseServer();
  const [r1, r2] = (await Promise.all([
    db.from("platforms").update({ position: b.position }).eq("id", a.id),
    db.from("platforms").update({ position: a.position }).eq("id", b.id),
  ])) as PgResult<null>[];
  check(r1);
  check(r2);
}

// ---- users ----

export async function listUsers(): Promise<AppUser[]> {
  const res = (await supabaseServer()
    .from("app_users")
    .select("id,username,password_hash,role,created_at")
    .order("created_at", { ascending: true })) as PgResult<AppUser[]>;
  check(res);
  return res.data ?? [];
}

export async function findUserByUsername(username: string): Promise<AppUser | null> {
  const res = (await supabaseServer()
    .from("app_users")
    .select("id,username,password_hash,role,created_at")
    .ilike("username", username)
    .maybeSingle()) as PgResult<AppUser>;
  check(res);
  return res.data ?? null;
}

export async function findUserById(id: string): Promise<AppUser | null> {
  const res = (await supabaseServer()
    .from("app_users")
    .select("id,username,password_hash,role,created_at")
    .eq("id", id)
    .maybeSingle()) as PgResult<AppUser>;
  check(res);
  return res.data ?? null;
}

export async function createUser(input: {
  username: string;
  passwordHash: string;
  role: AppUser["role"];
}): Promise<void> {
  const res = (await supabaseServer()
    .from("app_users")
    .insert({
      username: input.username,
      password_hash: input.passwordHash,
      role: input.role,
    })) as PgResult<null>;
  check(res);
}

export async function updateUserPassword(id: string, passwordHash: string): Promise<void> {
  const res = (await supabaseServer()
    .from("app_users")
    .update({ password_hash: passwordHash })
    .eq("id", id)) as PgResult<null>;
  check(res);
}

export async function deleteUser(id: string): Promise<void> {
  const res = (await supabaseServer().from("app_users").delete().eq("id", id)) as PgResult<null>;
  check(res);
}

export async function countAdmins(excludingId?: string): Promise<number> {
  const users = await listUsers();
  return users.filter((u) => u.role === "admin" && u.id !== excludingId).length;
}
