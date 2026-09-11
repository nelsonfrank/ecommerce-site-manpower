import Link from "next/link";
import { Hero } from "@/components/organisms/Hero";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Button } from "@/components/ui/Button";
import HomeFeaturedProducts from "@/components/organisms/HomeFeaturedProducts";

export const metadata = {
  title: "North & Co. — Thoughtfully Selected Everyday Goods",
  description:
    "Thoughtfully selected everyday goods with clear pricing, dependable quality, and a checkout that gets out of your way.",
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <Hero />

      {/* Popular Products — fetched client-side via React Query */}
      <HomeFeaturedProducts />
    </div>
  );
}
