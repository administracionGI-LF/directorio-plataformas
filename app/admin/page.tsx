import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import AdminHeader from "@/components/AdminHeader";
import CardsTab from "./CardsTab";
import UsersTab from "./UsersTab";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    form?: string;
    id?: string;
    pwdError?: string;
    pwdOk?: string;
    userError?: string;
    userOk?: string;
  }>;
}) {
  const session = await requireAdmin();
  const params = await searchParams;
  const tab = params.tab === "users" ? "users" : "cards";

  return (
    <div className={styles.page}>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.tabs}>
          <Link
            href="/admin?tab=cards"
            className={`${styles.tab} ${tab === "cards" ? styles.tabActive : ""}`}
          >
            Cards
          </Link>
          <Link
            href="/admin?tab=users"
            className={`${styles.tab} ${styles.tabSecond} ${tab === "users" ? styles.tabActive : ""}`}
          >
            Usuarios y contraseña
          </Link>
        </div>

        {tab === "cards" ? (
          <CardsTab form={params.form} editId={params.id} />
        ) : (
          <UsersTab
            session={session}
            pwdError={params.pwdError}
            pwdOk={params.pwdOk}
            userError={params.userError}
            userOk={params.userOk}
          />
        )}
      </div>
    </div>
  );
}
