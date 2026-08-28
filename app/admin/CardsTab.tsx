import Link from "next/link";
import styles from "./admin.module.css";
import CardForm from "./CardForm";
import CardRow from "./CardRow";
import { listPlatforms } from "@/lib/data";

export default async function CardsTab({
  form,
  editId,
}: {
  form?: string;
  editId?: string;
}) {
  const cards = await listPlatforms();
  const editing = form === "edit" && editId ? cards.find((c) => c.id === editId) ?? null : null;
  const showForm = form === "new" || (form === "edit" && editing);

  return (
    <div>
      <div className={styles.cardsTopRow}>
        <div className={styles.cardsCount}>{cards.length} cards registradas</div>
        <Link href="/admin?tab=cards&form=new" className={styles.primaryBtn}>
          + Nueva card
        </Link>
      </div>

      {showForm ? <CardForm editing={editing} /> : null}

      <div className={styles.rowList}>
        {cards.map((card) => (
          <CardRow key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
