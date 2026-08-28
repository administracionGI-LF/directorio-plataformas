"use client";

import { useState } from "react";
import styles from "./login.module.css";

export default function PasswordField() {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.passwordRow}>
      <input
        type={show ? "text" : "password"}
        name="password"
        placeholder="••••••••"
        className={styles.inputFlex}
        autoComplete="current-password"
      />
      <button type="button" onClick={() => setShow((s) => !s)} className={styles.toggleBtn}>
        {show ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}
