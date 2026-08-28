import styles from "./admin.module.css";
import { changeOwnPasswordAction, createUserAction, deleteUserAction } from "./actions";
import { listUsers } from "@/lib/data";
import type { SessionPayload } from "@/lib/types";

export default async function UsersTab({
  session,
  pwdError,
  pwdOk,
  userError,
  userOk,
}: {
  session: SessionPayload;
  pwdError?: string;
  pwdOk?: string;
  userError?: string;
  userOk?: string;
}) {
  const users = await listUsers();

  return (
    <div className={styles.usersCol}>
      <div className={styles.panelBox}>
        <div className={styles.panelBoxTitle}>Cambiar mi contraseña</div>
        <form action={changeOwnPasswordAction}>
          <div className={styles.formGrid3}>
            <input
              type="password"
              name="current"
              placeholder="Contraseña actual"
              required
              className={styles.fieldInput}
              style={{ marginTop: 0 }}
            />
            <input
              type="password"
              name="next"
              placeholder="Nueva contraseña"
              required
              className={styles.fieldInput}
              style={{ marginTop: 0 }}
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirmar nueva"
              required
              className={styles.fieldInput}
              style={{ marginTop: 0 }}
            />
          </div>
          {pwdError ? <div className={`${styles.message} ${styles.messageErr}`}>{pwdError}</div> : null}
          {pwdOk ? (
            <div className={`${styles.message} ${styles.messageOk}`}>Contraseña actualizada.</div>
          ) : null}
          <button type="submit" className={styles.saveBtn}>
            Actualizar contraseña
          </button>
        </form>
      </div>

      <div className={styles.panelBox}>
        <div className={styles.panelBoxTitle}>Crear usuario</div>
        <form action={createUserAction}>
          <div className={styles.formGrid3}>
            <input
              type="text"
              name="username"
              placeholder="usuario"
              required
              className={styles.fieldInput}
              style={{ marginTop: 0 }}
            />
            <input
              type="password"
              name="password"
              placeholder="contraseña"
              required
              className={styles.fieldInput}
              style={{ marginTop: 0 }}
            />
            <select name="role" defaultValue="viewer" className={styles.fieldInput} style={{ marginTop: 0 }}>
              <option value="viewer">Solo ver directorio</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          {userError ? (
            <div className={`${styles.message} ${styles.messageErr}`}>{userError}</div>
          ) : null}
          {userOk ? <div className={`${styles.message} ${styles.messageOk}`}>Usuario creado.</div> : null}
          <button type="submit" className={styles.saveBtn}>
            Crear usuario
          </button>
        </form>
      </div>

      <div className={styles.panelBox}>
        <div className={styles.panelBoxTitle}>Usuarios existentes</div>
        <div className={styles.userRows}>
          {users.map((u) => {
            const canDelete = u.username !== session.username;
            return (
              <div key={u.id} className={styles.userRow}>
                <div className={styles.userName}>{u.username}</div>
                <div className={styles.roleTag}>
                  {u.role === "admin" ? "Administrador" : "Solo ver"}
                </div>
                {canDelete ? (
                  <form action={deleteUserAction.bind(null, u.id)}>
                    <button type="submit" className={styles.deleteBtn}>
                      Eliminar
                    </button>
                  </form>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
