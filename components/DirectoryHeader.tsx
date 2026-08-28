import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import LogoutButton from "./LogoutButton";

export default function DirectoryHeader({
  username,
  isAdmin,
}: {
  username: string;
  isAdmin: boolean;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <div className={styles.logoBadgeLungFung}>
            <Image
              src="/logos/lung-fung.png"
              alt="Lung Fung"
              width={28}
              height={30}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.titleText}>Directorio de Plataformas</div>
          <div className={styles.logoBadgeGolden}>
            <Image
              src="/logos/golden-palace.png"
              alt="Golden Palace"
              width={22}
              height={22}
              style={{ objectFit: "contain", width: "auto", height: "22px" }}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.greeting}>
            Hola, <b className={styles.greetingName}>{username}</b>
          </div>
          {isAdmin ? (
            <Link href="/admin" className={styles.btnGhost}>
              ⚙ Configuración
            </Link>
          ) : null}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
