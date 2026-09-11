"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductDetailQuery } from "@/lib/api/hooks/useProducts";
import { useProductsQuery } from "@/lib/api/hooks/useProducts";
import { useStore } from "@/lib/store";
import { useAddToCartMutation } from "@/lib/api/hooks/useCart";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ReviewSummary } from "@/components/organisms/ReviewSummary";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { ProductDetailLayout } from "@/components/templates/ProductDetailLayout";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/api/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { data: product, isLoading, isError } = useProductDetailQuery(productId);
  const { data: relatedData } = useProductsQuery({ limit: 5 });
  const relatedProducts = (relatedData?.products ?? [])
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  const accessToken = useStore((s) => s.accessToken);
  const showToast = useStore((s) => s.showToast);
  const isInWishlist = useStore((s) => s.isInWishlist(productId));
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  // Local cart for guest users; authenticated users rely on backend cart
  const localAddToCart = useStore((s) => s.addToCart);

  const addToCartMutation = useAddToCartMutation();
  const [quantity, setQuantity] = React.useState(1);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate text-sm animate-pulse">
        Loading product...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h1 className="font-display font-semibold text-2xl text-ink">
          Product Not Found
        </h1>
        <p className="text-slate text-sm mt-2 mb-6">
          The item you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => router.push("/shop")}>Return to Shop</Button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const inWish = isInWishlist;

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    if (added) {
      showToast({
        message: `${product.name} saved to wishlist`,
        actionLabel: "View",
        actionHref: "/wishlist",
        image: product.img,
      });
    } else {
      showToast({ message: "Removed from wishlist" });
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      showToast({ message: `We'll notify you when ${product.name} is back in stock` });
      return;
    }

    if (accessToken) {
      // Authenticated: add via backend cart API
      addToCartMutation.mutate(
        { productId: product.id, quantity },
        {
          onSuccess: () => {
            showToast({
              message: `${quantity} × ${product.name} added to cart`,
              actionLabel: "View cart",
              actionHref: "/cart",
              image: product.img,
            });
          },
          onError: (err) => {
            const axiosErr = err as AxiosError<ApiErrorResponse>;
            const msg = axiosErr.response?.data?.message;
            showToast({
              message: Array.isArray(msg) ? msg[0] : (msg ?? "Could not add to cart"),
            });
          },
        }
      );
    } else {
      // Guest: add to local store
      localAddToCart(product.id, quantity, product.stock);
      showToast({
        message: `${quantity} × ${product.name} added to cart`,
        actionLabel: "View cart",
        actionHref: "/cart",
        image: product.img,
      });
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    handleAddToCart();
    router.push("/cart");
  };

  const renderStockBadge = () => {
    if (product.stock === 0) {
      return <Badge variant="error" withDot>Out of stock</Badge>;
    }
    if (product.stock <= 3) {
      return <Badge variant="warning" withDot>Only {product.stock} left</Badge>;
    }
    return <Badge variant="success" withDot>In stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <ProductDetailLayout
        gallery={<ProductGallery imageSrc={product.img} alt={product.name} />}
        details={
          <div className="space-y-5">
            {/* Header: Rating, Title & Wishlist */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <Rating rating={product.rating} reviews={product.reviews} />
                  <h1 className="font-display font-semibold text-3xl md:text-[38px] tracking-[-0.04em] text-ink leading-[1.1]">
                    {product.name}
                  </h1>
                </div>

                <IconButton
                  active={inWish}
                  onClick={handleWishlistToggle}
                  aria-label={inWish ? "Remove from wishlist" : "Save to wishlist"}
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill={inWish ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z" />
                  </svg>
                </IconButton>
              </div>

              {/* Price */}
              <div className="mt-3">
                <Price price={product.price} size="lg" showDiscountBadge />
              </div>

              {/* Stock status badge */}
              <div className="mt-3">{renderStockBadge()}</div>
            </div>

            {/* Description */}
            <p className="font-sans text-[15px] text-slate leading-[1.65] font-normal pt-2">
              {product.desc}
            </p>

            {/* Quantity Selector & Stock note */}
            <div className="flex items-center gap-4 pt-2">
              <QuantitySelector
                value={quantity}
                min={1}
                max={product.stock || 1}
                onChange={setQuantity}
                disabled={isOutOfStock}
              />
              <span className="font-sans text-[13px] text-slate font-normal">
                {product.stock > 0 ? "Ready to ship" : "Currently unavailable"}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant="secondary"
                disabled={isOutOfStock || addToCartMutation.isPending}
                onClick={handleAddToCart}
              >
                {addToCartMutation.isPending ? "Adding…" : "Add to cart"}
              </Button>
              <Button
                variant="primary"
                disabled={isOutOfStock}
                onClick={handleBuyNow}
              >
                Buy now
              </Button>
            </div>

            {/* Value Propositions */}
            <div className="border-t border-mist pt-2 divide-y divide-mist">
              <div className="flex items-start gap-3.5 py-4 text-sm">
                <div className="h-9 w-9 shrink-0 rounded-sm bg-action-subtle text-action flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7h13v10H3z" />
                    <path d="M16 10h4l1 3v4h-5" />
                    <circle cx="7.5" cy="18.5" r="1.5" />
                    <circle cx="17.5" cy="18.5" r="1.5" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-ink font-semibold">Shipping</strong>
                  <span className="text-[13px] text-slate font-normal">Free over $50 · 2–5 business days</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 py-4 text-sm">
                <div className="h-9 w-9 shrink-0 rounded-sm bg-action-subtle text-action flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9" />
                    <path d="M3 4v5h5" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-ink font-semibold">Returns</strong>
                  <span className="text-[13px] text-slate font-normal">30-day easy returns</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 py-4 text-sm">
                <div className="h-9 w-9 shrink-0 rounded-sm bg-action-subtle text-action flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-ink font-semibold">Secure checkout</strong>
                  <span className="text-[13px] text-slate font-normal">Encrypted payment</span>
                </div>
              </div>
            </div>

            <ReviewSummary rating={product.rating} totalReviews={product.reviews} />
          </div>
        }
        relatedProducts={
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-[22px] tracking-[-0.03em] text-ink">
              You may also like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        }
      />
    </div>
  );
}
