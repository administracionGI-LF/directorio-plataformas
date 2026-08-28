import Link from "next/link";
import styles from "./admin.module.css";
import { createCardAction, updateCardAction } from "./actions";
import type { Platform } from "@/lib/types";

export default function CardForm({ editing }: { editing: Platform | null }) {
  const action = editing ? updateCardAction.bind(null, editing.id) : createCardAction;

  return (
    <div className={styles.formPanel}>
      <div className={styles.formTitle}>{editing ? "Editar card" : "Nueva card"}</div>
      <form action={action}>
        <div className={styles.formGrid2}>
          <div>
            <label className={styles.fieldLabel} htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={editing?.name ?? ""}
              className={styles.fieldInput}
            />
          </div>
          <div>
            <label className={styles.fieldLabel} htmlFor="brand">
              Marca
            </label>
            <select
              id="brand"
              name="brand"
              defaultValue={editing?.brand ?? "lungfung"}
              className={styles.fieldInput}
            >
              <option value="lungfung">Chifa Lung Fung</option>
              <option value="golden">Golden Palace</option>
            </select>
          </div>
        </div>
        <div className={styles.formGrid2}>
          <div>
            <label className={styles.fieldLabel} htmlFor="link">
              Link
            </label>
            <input
              id="link"
              name="link"
              type="text"
              placeholder="https://..."
              defaultValue={editing?.link ?? ""}
              className={styles.fieldInput}
            />
          </div>
          <div>
            <label className={styles.fieldLabel} htmlFor="linkPassword">
              Contraseña del link (opcional)
            </label>
            <input
              id="linkPassword"
              name="linkPassword"
              type="text"
              placeholder="Contraseña de acceso a esa plataforma"
              defaultValue={editing?.linkPassword ?? ""}
              className={styles.fieldInput}
              autoComplete="off"
            />
          </div>
        </div>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="active" defaultChecked={editing?.active ?? true} />
          Activa (visible en el directorio)
        </label>
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn}>
            Guardar
          </button>
          <Link href="/admin?tab=cards" className={styles.cancelBtn}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
