"use server";

import { redirect } from "next/navigation";
import { findUserByUsername } from "@/lib/data";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const user = username ? await findUserByUsername(username) : null;
  const ok = user ? await verifyPassword(password, user.password_hash) : false;

  if (!user || !ok) {
    const qs = new URLSearchParams({
      error: "Usuario o contraseña incorrectos.",
      username,
    });
    redirect(`/login?${qs.toString()}`);
  }

  await setSessionCookie({ sub: user.id, username: user.username, role: user.role });
  redirect("/directory");
}
