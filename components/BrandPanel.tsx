import type { CSSProperties } from "react";
import type { BrandMeta } from "@/lib/brands";
import type { Platform } from "@/lib/types";
import { BrandIcon } from "./icons";
import PasswordReveal from "./PasswordReveal";
import styles from "@/app/directory/directory.module.css";

export default function BrandPanel({ meta, items }: { meta: BrandMeta; items: Platform[] }) {
  const panelVars = {
    "--brand-color": meta.color,
    "--brand-sub-color": meta.subColor,
    "--brand-gradient": meta.gradient,
    "--brand-panel-bg": meta.panelBg,
    "--brand-panel-border": meta.panelBorder,
    "--brand-card-border": meta.cardBorder,
  } as CSSProperties;

  return (
    <div className={styles.panel} style={panelVars}>
      <div className={styles.panelHead}>
        <div className={styles.panelIcon}>
          <BrandIcon brand={meta.key} size={24} />
        </div>
        <div>
          <div className={styles.panelLabel}>{meta.label}</div>
          <div className={styles.panelTagline}>{meta.tagline}</div>
        </div>
      </div>

      {items.length > 0 ? (
        <div className={styles.grid}>
          {items.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.cardStrip} />
              <div className={styles.cardBody}>
                <div className={styles.cardTopRow}>
                  <div className={styles.cardIcon}>
                    <BrandIcon brand={meta.key} size={19} color="#fff" />
                  </div>
                  {!card.link ? <div className={styles.sinLink}>sin link</div> : null}
                </div>
                <div className={styles.cardName}>{card.name}</div>
                {card.linkPassword ? <PasswordReveal password={card.linkPassword} /> : null}
                {card.link ? (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardOpen}
                  >
                    Abrir plataforma <span>↗</span>
                  </a>
                ) : (
                  <div className={styles.cardOpen}>
                    Abrir plataforma <span>↗</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>Sin plataformas activas todavía.</div>
      )}
    </div>
  );
}
