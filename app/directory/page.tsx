import { requireSession } from "@/lib/auth";
import { listPlatforms } from "@/lib/data";
import { BRAND_META, BRAND_ORDER } from "@/lib/brands";
import DirectoryHeader from "@/components/DirectoryHeader";
import BrandPanel from "@/components/BrandPanel";
import styles from "./directory.module.css";

export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const session = await requireSession();
  const platforms = await listPlatforms();

  return (
    <div className={styles.page}>
      <DirectoryHeader username={session.username} isAdmin={session.role === "admin"} />
      <div className={styles.body}>
        {BRAND_ORDER.map((brand) => {
          const meta = BRAND_META[brand];
          const items = platforms.filter((p) => p.brand === brand && p.active);
          return <BrandPanel key={brand} meta={meta} items={items} />;
        })}
      </div>
    </div>
  );
}
