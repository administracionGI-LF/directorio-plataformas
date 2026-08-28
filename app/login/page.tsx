import Image from "next/image";
import styles from "./login.module.css";
import { login } from "./actions";
import PasswordField from "./PasswordField";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; username?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;
  const username = params.username ?? "";

  return (
    <div className={styles.page}>
      <div className={styles.glowTopLeft} />
      <div className={styles.glowBottomRight} />
      <div className={styles.glowBottomLeft} />

      <div className={styles.card}>
        <div className={styles.topBar} />
        <div className={styles.cardBody}>
          <div className={styles.logos}>
            <div className={styles.logoBoxGolden}>
              <Image
                src="/logos/golden-palace.png"
                alt="Golden Palace"
                width={120}
                height={40}
                className={styles.logoGolden}
              />
            </div>
            <div className={styles.logoDivider} />
            <div className={styles.logoBoxLungFung}>
              <Image
                src="/logos/lung-fung.png"
                alt="Lung Fung"
                width={48}
                height={44}
                className={styles.logoLungFung}
              />
            </div>
          </div>

          <div className={styles.titleBlock}>
            <div className={styles.title}>Directorio de Plataformas</div>
            <div className={styles.subtitle}>Chifa Lung Fung · Golden Palace</div>
          </div>

          <form action={login} className={styles.form}>
            <div>
              <label className={styles.label} htmlFor="username">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                name="username"
                defaultValue={username}
                placeholder="usuario"
                className={styles.input}
                autoComplete="username"
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="password">
                Contraseña
              </label>
              <PasswordField />
            </div>
            {error ? <div className={styles.error}>{error}</div> : null}
            <button type="submit" className={styles.submit}>
              Acceder
            </button>
          </form>
          <div className={styles.footerNote}>
            Acceso restringido · usuarios y contraseñas los crea el administrador.
          </div>
        </div>
      </div>
    </div>
  );
}
