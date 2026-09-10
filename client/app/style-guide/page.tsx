"use client";

import * as React from "react";
import Link from "next/link";
import { formatMoney, type CurrencyCode } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data";

// Atoms
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioCard } from "@/components/ui/RadioCard";
import { Chip } from "@/components/ui/Chip";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { Logo } from "@/components/ui/Logo";

// Molecules
import { SearchBar } from "@/components/molecules/SearchBar";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { ProductCard } from "@/components/molecules/ProductCard";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { StepIndicator } from "@/components/molecules/StepIndicator";
import { FormField } from "@/components/molecules/FormField";
import { ReviewBarRow } from "@/components/molecules/ReviewBarRow";
import { TimelineStep } from "@/components/molecules/TimelineStep";
import { OrderSummaryLine } from "@/components/molecules/OrderSummaryLine";

// Organisms
import { Hero } from "@/components/organisms/Hero";
import { ReviewSummary } from "@/components/organisms/ReviewSummary";
import { OrderTimeline } from "@/components/organisms/OrderTimeline";

const COLOR_GROUPS = [
  {
    title: "Brand & Neutral Tokens",
    colors: [
      { name: "ink", hex: "#1a1d23", bgClass: "bg-ink", textClass: "text-surface", usage: "Primary text, headings" },
      { name: "slate", hex: "#5b6270", bgClass: "bg-slate", textClass: "text-surface", usage: "Secondary/muted text" },
      { name: "mist", hex: "#e7e9ed", bgClass: "bg-mist", textClass: "text-ink", usage: "Borders, dividers" },
      { name: "paper", hex: "#fafaf9", bgClass: "bg-paper", textClass: "text-ink", usage: "Page background" },
      { name: "surface", hex: "#ffffff", bgClass: "bg-surface", textClass: "text-ink", usage: "Card / surface background", border: true },
    ],
  },
  {
    title: "Action Tokens",
    colors: [
      { name: "action", hex: "#3452eb", bgClass: "bg-action", textClass: "text-surface", usage: "Primary brand / CTA color" },
      { name: "action-hover", hex: "#2c44c9", bgClass: "bg-action-hover", textClass: "text-surface", usage: "Primary hover state" },
      { name: "action-subtle", hex: "#eef0fd", bgClass: "bg-action-subtle", textClass: "text-action", usage: "Selected states, icon chip backgrounds" },
    ],
  },
  {
    title: "Semantic Feedback Tokens",
    colors: [
      { name: "success", hex: "#1c8a5b", bgClass: "bg-success", textClass: "text-surface", usage: "In-stock, delivered states" },
      { name: "success-bg", hex: "#e7f5ee", bgClass: "bg-success-bg", textClass: "text-success", usage: "Success badge background" },
      { name: "warning", hex: "#b9740a", bgClass: "bg-warning", textClass: "text-surface", usage: "Low-stock, in-transit states" },
      { name: "warning-bg", hex: "#fbf1e2", bgClass: "bg-warning-bg", textClass: "text-warning", usage: "Warning badge background" },
      { name: "error", hex: "#c43a3a", bgClass: "bg-error", textClass: "text-surface", usage: "Out-of-stock, destructive, sale" },
      { name: "error-bg", hex: "#fbeaea", bgClass: "bg-error-bg", textClass: "text-error", usage: "Error badge background" },
    ],
  },
];

const CURRENCIES: CurrencyCode[] = ["USD", "TZS", "EUR", "KES"];

export default function StyleGuidePage() {
  const [qty, setQty] = React.useState(2);
  const [chipActive, setChipActive] = React.useState(true);
  const [radioSelected, setRadioSelected] = React.useState<"std" | "exp">("std");

  return (
    <main className="min-h-screen bg-paper text-ink p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-b border-mist pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate">
              Design System & Component Library
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink mt-1">
              North & Co. Component Library
            </h1>
            <p className="text-slate text-sm mt-1">
              Atoms, molecules, organisms, and templates built strictly bottom-up with idiomatic React and Tailwind tokens.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="focus-ring px-4 py-2 bg-surface border border-mist rounded-sm text-sm font-semibold hover:bg-mist/40 transition"
            >
              Back to Store
            </Link>
          </div>
        </div>

        {/* 1. ATOMS SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-mist pb-2">
            <span className="text-xs font-mono font-bold text-action uppercase">2a. Atoms</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Core Atoms (components/ui/)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">Button</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary (44px)</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" size="sm">Small (36px)</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>

            {/* Icon Buttons & Logo */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">IconButton & Logo</h3>
              <div className="flex flex-wrap items-center gap-4">
                <IconButton aria-label="Default icon button">
                  <span className="text-base">♡</span>
                </IconButton>
                <IconButton active aria-label="Wishlist active state">
                  <span className="text-base">♥</span>
                </IconButton>
                <IconButton size="sm" aria-label="Small icon button">
                  <span className="text-xs">✕</span>
                </IconButton>
                <div className="pl-4 border-l border-mist">
                  <Logo asLink={false} />
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">Badge</h3>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="success" withDot>In stock</Badge>
                <Badge variant="warning" withDot>Only 2 left</Badge>
                <Badge variant="error" withDot>Out of stock</Badge>
                <Badge variant="neutral">Category</Badge>
                <Badge variant="error">Sale</Badge>
              </div>
            </div>

            {/* Chips & Avatars */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">Chip & Avatar</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Chip active={chipActive} onClick={() => setChipActive(!chipActive)}>
                  Active Chip
                </Chip>
                <Chip active={!chipActive} onClick={() => setChipActive(!chipActive)}>
                  Default Chip
                </Chip>
                <div className="flex items-center gap-2 pl-4 border-l border-mist">
                  <Avatar initials="JR" size="sm" />
                  <Avatar initials="JR" size="md" />
                  <Avatar initials="JR" size="lg" />
                </div>
              </div>
            </div>

            {/* Rating & Price */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">Rating & Price</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-6">
                  <Rating rating={4.8} reviews={124} />
                  <Rating rating={4.9} size="default" />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <Price price={4800} oldPrice={6000} showDiscountBadge />
                  <Price price={8900} size="lg" />
                </div>
              </div>
            </div>

            {/* Form Inputs & Skeletons */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">Input, Select & Skeleton</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input placeholder="Input (44px height)" />
                <Select defaultValue="option1">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </Select>
              </div>
              <div className="space-y-2 pt-2 border-t border-mist">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. MOLECULES SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-mist pb-2">
            <span className="text-xs font-mono font-bold text-action uppercase">2b. Molecules</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Compound Molecules (components/molecules/)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SearchBar & QuantitySelector */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">SearchBar & QuantitySelector</h3>
              <SearchBar placeholder="Type to test debounced search..." />
              <div className="flex items-center gap-4 pt-2">
                <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
                <span className="text-sm text-slate">Selected quantity: {qty}</span>
              </div>
            </div>

            {/* Breadcrumb & StepIndicator */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">Breadcrumb & StepIndicator</h3>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Shop", href: "/shop" },
                  { label: "Everyday Tote" },
                ]}
              />
              <StepIndicator
                steps={["Contact", "Delivery", "Shipping", "Review"]}
                currentStep={2}
              />
            </div>

            {/* RadioCard & FormField */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">RadioCard & FormField</h3>
              <FormField label="Delivery Email" hint="We will send your order confirmation here.">
                <Input type="email" defaultValue="jordan@mail.com" />
              </FormField>

              <div className="space-y-2 pt-2">
                <RadioCard
                  id="demo-std"
                  name="demo-ship"
                  checked={radioSelected === "std"}
                  onChange={() => setRadioSelected("std")}
                  titleText="Standard delivery"
                  description="2–5 business days · Free over $50"
                />
                <RadioCard
                  id="demo-exp"
                  name="demo-ship"
                  checked={radioSelected === "exp"}
                  onChange={() => setRadioSelected("exp")}
                  titleText="Express delivery"
                  description="1–2 business days · $12.00"
                />
              </div>
            </div>

            {/* CategoryCard & OrderSummaryLine */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">CategoryCard & Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <CategoryCard name="Bags" itemCountText="1+ products" />
                <CategoryCard name="Kitchen" itemCountText="2+ products" />
              </div>

              <div className="border-t border-mist pt-2 space-y-1">
                <OrderSummaryLine label="Everyday Tote × 1" value="$48.00" />
                <OrderSummaryLine isTotal label="Subtotal" value="$48.00" />
              </div>
            </div>
          </div>

          {/* ProductCard in responsive demo grid */}
          <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-base text-ink">ProductCard (2 samples)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <ProductCard product={PRODUCTS[0]} />
              <ProductCard product={PRODUCTS[2]} />
            </div>
          </div>
        </section>

        {/* 3. ORGANISMS SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-mist pb-2">
            <span className="text-xs font-mono font-bold text-action uppercase">2c. Organisms</span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Complex Organisms (components/organisms/)
            </h2>
          </div>

          {/* Hero Organism */}
          <Hero />

          {/* ReviewSummary & OrderTimeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">ReviewSummary</h3>
              <ReviewSummary rating={4.8} totalReviews={124} />
            </div>

            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">OrderTimeline</h3>
              <OrderTimeline status="in_transit" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
