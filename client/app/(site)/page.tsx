import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { Hero } from "@/components/organisms/Hero";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "North & Co. — Thoughtfully Selected Everyday Goods",
  description:
    "Thoughtfully selected everyday goods with clear pricing, dependable quality, and a checkout that gets out of your way.",
};

const CATEGORY_COUNTS: Record<string, string> = {
  Bags: "1+ products",
  Kitchen: "2+ products",
  Home: "2+ products",
  Stationery: "1+ products",
};

export default function HomePage() {
  const popularProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <Hero />

      {/* Shop by Category */}
      <section aria-labelledby="category-heading">
        <div className="mb-3.5">
          <h2
            id="category-heading"
            className="font-display font-semibold text-[22px] tracking-[-0.03em] text-ink"
          >
            Shop by category
          </h2>
          <p className="font-sans text-[13px] text-slate font-normal mt-1">
            Find what you need faster.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat}
              name={cat}
              itemCountText={CATEGORY_COUNTS[cat] || "Multiple items"}
              href={`/shop?category=${encodeURIComponent(cat)}`}
            />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section aria-labelledby="popular-heading">
        <div className="flex items-center justify-between mb-3.5">
          <h2
            id="popular-heading"
            className="font-display font-semibold text-[22px] tracking-[-0.03em] text-ink"
          >
            Popular products
          </h2>
          <Link href="/shop" className="focus-ring rounded-sm">
            <Button variant="secondary" size="sm">
              View all
            </Button>
          </Link>
        </div>

        <ProductGrid products={popularProducts} />
      </section>
    </div>
  );
}
