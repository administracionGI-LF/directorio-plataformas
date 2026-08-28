import Link from "next/link";
import styles from "./admin.module.css";
import { BrandIcon } from "@/components/icons";
import { BRAND_META } from "@/lib/brands";
import { deleteCardAction, moveCardAction, toggleCardAction } from "./actions";
import type { Platform } from "@/lib/types";

export default function CardRow({ card }: { card: Platform }) {
  const meta = BRAND_META[card.brand];

  return (
    <div className={`${styles.row} ${card.active ? "" : styles.rowInactive}`}>
      <div className={styles.rowIcon} style={{ background: meta.gradient }}>
        <BrandIcon brand={card.brand} size={16} color="#fff" />
      </div>
      <div className={styles.rowMain}>
        <div className={styles.rowName}>{card.name}</div>
        <div className={styles.rowLink}>{card.link || "(sin link configurado)"}</div>
      </div>
      <div className={styles.tag} style={{ background: meta.tagBg, color: meta.tagColor }}>
        {meta.shortLabel}
      </div>
      <div className={styles.reorderGroup}>
        <form action={moveCardAction.bind(null, card.id, "up")}>
          <button type="submit" className={styles.reorderBtn} aria-label="Subir">
            ▲
          </button>
        </form>
        <form action={moveCardAction.bind(null, card.id, "down")}>
          <button type="submit" className={styles.reorderBtn} aria-label="Bajar">
            ▼
          </button>
        </form>
      </div>
      <form action={toggleCardAction.bind(null, card.id)}>
        <button type="submit" className={styles.smallBtn}>
          {card.active ? "Desactivar" : "Activar"}
        </button>
      </form>
      <Link href={`/admin?tab=cards&form=edit&id=${card.id}`} className={styles.smallBtn}>
        Editar
      </Link>
      <form action={deleteCardAction.bind(null, card.id)}>
        <button type="submit" className={styles.deleteBtn}>
          Eliminar
        </button>
      </form>
    </div>
  );
}
