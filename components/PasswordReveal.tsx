"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";
import styles from "@/app/directory/directory.module.css";

const MASK = "••••••••";

export default function PasswordReveal({ password }: { password: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.pwRow}>
      <span className={styles.pwLabel}>Contraseña</span>
      <span className={styles.pwValue}>{show ? password : MASK}</span>
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className={styles.pwToggle}
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {show ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
      </button>
    </div>
  );
}
