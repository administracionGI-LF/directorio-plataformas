import Link from "next/link";
import styles from "./Header.module.css";
import LogoutButton from "./LogoutButton";

export default function AdminHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.leftAdmin}>
          <Link href="/directory" className={styles.btnBack}>
            ← Volver
          </Link>
          <div className={styles.adminTitle}>⚙ Configuración</div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
