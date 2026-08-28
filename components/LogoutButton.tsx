import { logout } from "@/app/actions";
import styles from "./Header.module.css";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className={styles.btnOutline}>
        Cerrar sesión
      </button>
    </form>
  );
}
