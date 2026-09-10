"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, formatMoney } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { Button } from "@/components/ui/Button";

export interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const currency = useStore((state) => state.currency);

  return (
    <div className="grid grid-cols-[64px_1fr] xs:grid-cols-[88px_1fr_auto] gap-3 xs:gap-4 items-center py-4.5 border-b border-mist">
      {/* Product Image */}
      <div className="relative h-16 w-16 xs:h-[88px] xs:w-[88px] shrink-0 overflow-hidden rounded-sm border border-mist bg-[#f3f4f5] p-1">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="88px"
          className="object-contain"
        />
      </div>

      {/* Info */}
      <div className="min-w-0">
        <Link
          href={`/product/${product.id}`}
          className="focus-ring block rounded-xs text-left"
        >
          <h3 className="font-display font-semibold text-[15px] leading-snug tracking-[-0.02em] text-ink hover:text-action transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="text-[13px] text-slate mt-1 flex items-center gap-1.5 font-normal">
          <span className="font-display tabular font-medium text-ink">
            {formatMoney(product.price, currency)}
          </span>
          <span>·</span>
          <span>{product.stock > 0 ? "In stock" : "Unavailable"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="col-span-2 xs:col-span-1 flex items-center justify-between xs:justify-end gap-3 mt-2 xs:mt-0">
        <QuantitySelector
          value={quantity}
          min={1}
          max={product.stock}
          onChange={onUpdateQuantity}
          size="sm"
        />
        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
          aria-label={`Remove ${product.name} from cart`}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export interface CartItemListProps {
  items: { product: Product; quantity: number }[];
  className?: string;
}

export function CartItemList({ items, className }: CartItemListProps) {
  const setQuantity = useStore((state) => state.setQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map(({ product, quantity }) => (
        <CartItem
          key={product.id}
          product={product}
          quantity={quantity}
          onUpdateQuantity={(q) => setQuantity(product.id, q)}
          onRemove={() => removeFromCart(product.id)}
        />
      ))}
    </div>
  );
}
