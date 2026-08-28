"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin, hashPassword, verifyPassword } from "@/lib/auth";
import {
  createPlatform,
  createUser,
  deletePlatform,
  deleteUser,
  countAdmins,
  findUserById,
  findUserByUsername,
  movePlatform,
  togglePlatformActive,
  updatePlatform,
  updateUserPassword,
} from "@/lib/data";
import type { Brand, Role } from "@/lib/types";

function readCardFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    brand: (formData.get("brand") === "golden" ? "golden" : "lungfung") as Brand,
    link: String(formData.get("link") ?? "").trim(),
    linkPassword: String(formData.get("linkPassword") ?? "").trim(),
    active: formData.get("active") === "on",
  };
}

export async function createCardAction(formData: FormData) {
  await requireAdmin();
  const fields = readCardFields(formData);
  if (!fields.name) redirect("/admin?tab=cards&form=new");

  await createPlatform(fields);
  revalidatePath("/admin");
  revalidatePath("/directory");
  redirect("/admin?tab=cards");
}

export async function updateCardAction(id: string, formData: FormData) {
  await requireAdmin();
  const fields = readCardFields(formData);
  if (!fields.name) redirect(`/admin?tab=cards&form=edit&id=${id}`);

  await updatePlatform(id, fields);
  revalidatePath("/admin");
  revalidatePath("/directory");
  redirect("/admin?tab=cards");
}

export async function deleteCardAction(id: string) {
  await requireAdmin();
  await deletePlatform(id);
  revalidatePath("/admin");
  revalidatePath("/directory");
}

export async function toggleCardAction(id: string) {
  await requireAdmin();
  await togglePlatformActive(id);
  revalidatePath("/admin");
  revalidatePath("/directory");
}

export async function moveCardAction(id: string, direction: "up" | "down") {
  await requireAdmin();
  await movePlatform(id, direction);
  revalidatePath("/admin");
  revalidatePath("/directory");
}

export async function changeOwnPasswordAction(formData: FormData) {
  const session = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  const user = await findUserById(session.sub);
  const currentOk = user ? await verifyPassword(current, user.password_hash) : false;

  let error: string | null = null;
  if (!user || !currentOk) error = "La contraseña actual no coincide.";
  else if (next.length < 6) error = "La nueva contraseña debe tener al menos 6 caracteres.";
  else if (next !== confirm) error = "La confirmación no coincide.";

  if (error) {
    redirect(`/admin?tab=users&pwdError=${encodeURIComponent(error)}`);
  }

  await updateUserPassword(session.sub, await hashPassword(next));
  redirect("/admin?tab=users&pwdOk=1");
}

export async function createUserAction(formData: FormData) {
  await requireAdmin();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = (formData.get("role") === "admin" ? "admin" : "viewer") as Role;

  let error: string | null = null;
  if (!username || password.length < 6) {
    error = "Usuario y contraseña (mín. 6 caracteres) requeridos.";
  } else if (await findUserByUsername(username)) {
    error = "Ese usuario ya existe.";
  }

  if (error) {
    redirect(`/admin?tab=users&userError=${encodeURIComponent(error)}`);
  }

  await createUser({ username, passwordHash: await hashPassword(password), role });
  revalidatePath("/admin");
  redirect("/admin?tab=users&userOk=1");
}

export async function deleteUserAction(id: string) {
  const session = await requireAdmin();
  if (id === session.sub) return;
  const target = await findUserById(id);
  if (!target) return;
  if (target.role === "admin" && (await countAdmins(id)) === 0) return;
  await deleteUser(id);
  revalidatePath("/admin");
}
