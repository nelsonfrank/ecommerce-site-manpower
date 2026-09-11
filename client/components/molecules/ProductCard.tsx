"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { useAddToCartMutation } from "@/lib/api/hooks";

export interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onNotifyStock?: (product: Product) => void;
}

export function ProductCard({
  product,
  className,
  onAddToCart,
  onNotifyStock,
}: ProductCardProps) {
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCartStore = useStore((state) => state.addToCart);
  const showToast = useStore((state) => state.showToast);
  const addToCartMutation = useAddToCartMutation();
  const inWish = isInWishlist;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      showToast({
        message: `${product.name} saved to wishlist`,
        actionLabel: "View",
        actionHref: "/wishlist",
        image: product.img,
      });
    } else {
      showToast({
        message: "Removed from wishlist",
      });
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) {
      if (onNotifyStock) {
        onNotifyStock(product);
      } else {
        showToast({
          message: `We'll notify you when ${product.name} is back in stock`,
        });
      }
    } else {
      if (onAddToCart) {
        onAddToCart(product);
      } else {
        addToCartMutation.mutate({ productId: product.id, quantity: 1 }, {
          onSuccess: () => {
            showToast({
              message: `${product.name} added to cart`,
              actionLabel: "View cart",
              actionHref: "/cart",
              image: product.img,
            });
          },
          onError: () => {
            showToast({
              message: `${product.name} failed to add to cart`,
            });
          }
        });
      }
    }
  };

  return (
    <article
      className={cn(
        "group flex flex-col min-w-0 bg-transparent",
        className
      )}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md border border-mist bg-[#f1f2f4] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
        {/* Wishlist Icon Button */}
        <div className="absolute right-2.5 top-2.5 z-10">
          <IconButton
            size="sm"
            active={inWish}
            onClick={handleWishlistToggle}
            aria-label={inWish ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              width="16"
              height="16"
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

        {/* Sale Badge */}
        {product.oldPrice && product.oldPrice > product.price && (
          <div className="absolute left-2.5 top-2.5 z-10">
            <Badge variant="error">Sale</Badge>
          </div>
        )}

        {/* Product Image Link */}
        <Link
          href={`/product/${product.id}`}
          className="focus-ring block h-full w-full p-2"
          aria-label={`View ${product.name}`}
        >
          <div className="relative h-full w-full">
            <Image
              src={product.img}
              alt={product.name}
              fill
              sizes="(max-width: 520px) 50vw, (max-width: 820px) 50vw, (max-width: 1100px) 33vw, 25vw"
              className="object-contain p-2 transition-transform duration-250 ease-out group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="pt-3 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/product/${product.id}`}
            className="focus-ring block text-left"
          >
            <h3 className="font-display font-semibold text-[15px] leading-snug tracking-[-0.02em] text-ink transition-colors hover:text-action line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="mt-1">
            <Rating rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-1.5">
            <Price price={product.price} oldPrice={product.oldPrice} />
          </div>

          <div
            className={cn(
              "text-xs mt-1 leading-none",
              isOutOfStock
                ? "text-error"
                : isLowStock
                ? "text-warning font-medium"
                : "text-slate"
            )}
          >
            {isOutOfStock
              ? "Unavailable"
              : isLowStock
              ? `Only ${product.stock} left`
              : "In stock"}
          </div>
        </div>

        <div className="mt-3">
          <Button
            size="sm"
            fullWidth
            variant={isOutOfStock ? "secondary" : "primary"}
            onClick={handleActionClick}
          >
            {isOutOfStock ? "Notify me" : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
