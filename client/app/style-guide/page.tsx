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
      {
        name: "ink",
        hex: "#1a1d23",
        bgClass: "bg-ink",
        textClass: "text-surface",
        usage: "Primary text, headings",
      },
      {
        name: "slate",
        hex: "#5b6270",
        bgClass: "bg-slate",
        textClass: "text-surface",
        usage: "Secondary/muted text",
      },
      {
        name: "mist",
        hex: "#e7e9ed",
        bgClass: "bg-mist",
        textClass: "text-ink",
        usage: "Borders, dividers",
      },
      {
        name: "paper",
        hex: "#fafaf9",
        bgClass: "bg-paper",
        textClass: "text-ink",
        usage: "Page background",
      },
      {
        name: "surface",
        hex: "#ffffff",
        bgClass: "bg-surface",
        textClass: "text-ink",
        usage: "Card / surface background",
        border: true,
      },
    ],
  },
  {
    title: "Action Tokens",
    colors: [
      {
        name: "action",
        hex: "#3452eb",
        bgClass: "bg-action",
        textClass: "text-surface",
        usage: "Primary brand / CTA color",
      },
      {
        name: "action-hover",
        hex: "#2c44c9",
        bgClass: "bg-action-hover",
        textClass: "text-surface",
        usage: "Primary hover state",
      },
      {
        name: "action-subtle",
        hex: "#eef0fd",
        bgClass: "bg-action-subtle",
        textClass: "text-action",
        usage: "Selected states, icon chip backgrounds",
      },
    ],
  },
  {
    title: "Semantic Feedback Tokens",
    colors: [
      {
        name: "success",
        hex: "#1c8a5b",
        bgClass: "bg-success",
        textClass: "text-surface",
        usage: "In-stock, delivered states",
      },
      {
        name: "success-bg",
        hex: "#e7f5ee",
        bgClass: "bg-success-bg",
        textClass: "text-success",
        usage: "Success badge background",
      },
      {
        name: "warning",
        hex: "#b9740a",
        bgClass: "bg-warning",
        textClass: "text-surface",
        usage: "Low-stock, in-transit states",
      },
      {
        name: "warning-bg",
        hex: "#fbf1e2",
        bgClass: "bg-warning-bg",
        textClass: "text-warning",
        usage: "Warning badge background",
      },
      {
        name: "error",
        hex: "#c43a3a",
        bgClass: "bg-error",
        textClass: "text-surface",
        usage: "Out-of-stock, destructive, sale",
      },
      {
        name: "error-bg",
        hex: "#fbeaea",
        bgClass: "bg-error-bg",
        textClass: "text-error",
        usage: "Error badge background",
      },
    ],
  },
];

const CURRENCIES: CurrencyCode[] = ["USD", "TZS", "EUR", "KES"];

export default function StyleGuidePage() {
  const [qty, setQty] = React.useState(2);
  const [chipActive, setChipActive] = React.useState(true);
  const [radioSelected, setRadioSelected] = React.useState<"std" | "exp">(
    "std",
  );

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
              Atoms, molecules, organisms, and templates built strictly
              bottom-up with idiomatic React and Tailwind tokens.
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

        {/* Fundamentals */}
        <section>
        <div className="border-b border-mist">
            <span className="text-xs font-mono font-bold text-action uppercase">
              1. Fundamentals
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Design System
            </h2>
          </div>
        </section>
        {/* Color Palette */}
        <section className="space-y-6">
          <div className="pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Color Tokens
            </h2>
            <p className="text-slate text-sm">
              Extracted from the North & Co. visual specifications.
            </p>
          </div>

          <div className="space-y-8">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="font-display text-lg font-medium text-ink">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.colors.map((c) => (
                    <div
                      key={c.name}
                      className="bg-surface rounded-md border border-mist overflow-hidden shadow-card flex flex-col"
                    >
                      <div
                        className={`h-24 w-full flex items-end p-3 ${c.bgClass} ${c.border ? "border-b border-mist" : ""}`}
                      >
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/30 text-white backdrop-blur-sm`}
                        >
                          {c.hex}
                        </span>
                      </div>
                      <div className="p-3 bg-surface flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <strong className="font-display font-semibold text-sm text-ink block">
                            {c.name}
                          </strong>
                          <span className="text-slate text-[11px] leading-tight block mt-1">
                            {c.usage}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div className=" pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Typography Scale
            </h2>
            <p className="text-slate text-sm">
              Headings & display numbers use <strong>Space Grotesk</strong>;
              body text and UI labels use <strong>Inter</strong>.
            </p>
          </div>

          <div className="space-y-6 bg-surface p-6 rounded-md border border-mist shadow-card">
            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">
                font-display (Space Grotesk) — 40px / 600 (-0.04em)
              </span>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-ink">
                Good products. Less clutter.
              </h1>
            </div>

            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">
                font-display (Space Grotesk) — 32px / 600 (-0.04em)
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
                Thoughtfully selected everyday goods
              </h2>
            </div>

            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">
                font-display (Space Grotesk) — 22px / 600 (-0.03em)
              </span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                Popular products & categories
              </h3>
            </div>

            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">
                font-sans (Inter) — 15px / 400 (Body text, 1.65 line-height)
              </span>
              <p className="font-sans text-[15px] leading-relaxed text-slate max-w-prose">
                A canvas tote sized for groceries and daily carry. Reinforced
                straps and a flat base so it stands on its own. Microwave and
                dishwasher safe with a matte exterior and gloss interior.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate">
                Tabular Numerals (Space Grotesk + tabular-nums)
              </span>
              <div className="flex flex-wrap gap-6 text-2xl font-semibold font-display tabular text-ink">
                <span>$18.00</span>
                <span>$48.00</span>
                <span>$89.00</span>
                <span>$105.00</span>
                <span className="text-slate line-through">$60.00</span>
              </div>
            </div>
          </div>
        </section>

        {/* Radii & Shadows */}
        <section className="space-y-6">
          <div className=" pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Radii & Shadows
            </h2>
            <p className="text-slate text-sm">
              Elevation and corner radius standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-surface p-6 rounded-sm border border-mist shadow-card">
              <span className="text-xs font-mono text-slate block mb-1">
                rounded-sm (8px)
              </span>
              <p className="font-display font-semibold text-ink">
                Small Radius
              </p>
              <p className="text-slate text-xs mt-1">
                Used on buttons, inputs, badges, and icon buttons.
              </p>
            </div>

            <div className="bg-surface p-6 rounded-md border border-mist shadow-card">
              <span className="text-xs font-mono text-slate block mb-1">
                rounded-md (12px)
              </span>
              <p className="font-display font-semibold text-ink">
                Medium Radius
              </p>
              <p className="text-slate text-xs mt-1">
                Used on cards, product images, containers, and summaries.
              </p>
            </div>

            <div className="bg-surface p-6 rounded-md border border-mist shadow-card">
              <span className="text-xs font-mono text-slate block mb-1">
                shadow-card
              </span>
              <p className="font-display font-semibold text-ink">
                0 8px 30px rgba(26,29,35,.08)
              </p>
              <p className="text-slate text-xs mt-1">
                Soft diffuse elevation for cards and floating toasts.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Ring & Interactive States */}
        <section className="space-y-6">
          <div className=" pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Focus Ring Utility (.focus-ring)
            </h2>
            <p className="text-slate text-sm">
              Keyboard accessible focus indicator: 3px action-subtle outer ring
              + 1px action inner ring. Press{" "}
              <kbd className="px-1.5 py-0.5 border border-mist rounded bg-mist/30 text-xs">
                Tab
              </kbd>{" "}
              to inspect.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center bg-surface p-6 rounded-md border border-mist">
            <button className="focus-ring h-11 px-4 bg-action text-surface rounded-sm font-sans font-semibold text-sm hover:bg-action-hover transition">
              Primary Button
            </button>

            <button className="focus-ring h-11 px-4 bg-surface text-ink border border-mist rounded-sm font-sans font-semibold text-sm hover:bg-mist/30 transition">
              Secondary Button
            </button>

            <input
              type="text"
              placeholder="Focused text input..."
              defaultValue="Click or tab here to test focus ring"
              className="focus-ring h-11 px-3 bg-surface border border-mist rounded-sm text-sm text-ink w-72"
            />
          </div>
        </section>

        {/* Currency Formatter Verification */}
        <section className="space-y-6">
          <div className="pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Currency Formatting Verification
            </h2>
            <p className="text-slate text-sm">
              Tested with integer cents (4800, 10500, 2200) across all 4
              supported currencies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CURRENCIES.map((cur) => (
              <div
                key={cur}
                className="bg-surface p-4 rounded-md border border-mist"
              >
                <span className="text-xs font-mono font-bold text-slate block">
                  {cur}
                </span>
                <span className="font-display text-xl font-bold tabular text-ink block mt-1">
                  {formatMoney(4800, cur)}
                </span>
                <span className="text-slate text-xs block mt-1">
                  {formatMoney(10500, cur)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Breakpoints */}
        <section className="space-y-6">
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Responsive Breakpoints
            </h2>
            <p className="text-slate text-sm">
              Matching prototype specification exactly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-surface p-4 rounded-md border border-mist">
              <strong className="font-display block text-ink">
                1100px (lg)
              </strong>
              <span className="text-slate text-xs">
                Desktop nav collapses into mobile header hamburger
              </span>
            </div>
            <div className="bg-surface p-4 rounded-md border border-mist">
              <strong className="font-display block text-ink">
                820px (md)
              </strong>
              <span className="text-slate text-xs">
                Sidebar filters hide into bottom sheet; mobile bottom nav
                appears; layout stacks
              </span>
            </div>
            <div className="bg-surface p-4 rounded-md border border-mist">
              <strong className="font-display block text-ink">
                520px (xs)
              </strong>
              <span className="text-slate text-xs">
                Grid tightens to 2 columns for products, single column forms
              </span>
            </div>
          </div>
        </section>

        {/* 1. ATOMS SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-mist pb-2">
            <span className="text-xs font-mono font-bold text-action uppercase">
              2a. Atoms
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Core Atoms (components/ui/)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                Button
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary (44px)</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" size="sm">
                  Small (36px)
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Icon Buttons & Logo */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                IconButton & Logo
              </h3>
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
              <h3 className="font-display font-semibold text-base text-ink">
                Badge
              </h3>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="success" withDot>
                  In stock
                </Badge>
                <Badge variant="warning" withDot>
                  Only 2 left
                </Badge>
                <Badge variant="error" withDot>
                  Out of stock
                </Badge>
                <Badge variant="neutral">Category</Badge>
                <Badge variant="error">Sale</Badge>
              </div>
            </div>

            {/* Chips & Avatars */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                Chip & Avatar
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Chip
                  active={chipActive}
                  onClick={() => setChipActive(!chipActive)}
                >
                  Active Chip
                </Chip>
                <Chip
                  active={!chipActive}
                  onClick={() => setChipActive(!chipActive)}
                >
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
              <h3 className="font-display font-semibold text-base text-ink">
                Rating & Price
              </h3>
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
              <h3 className="font-display font-semibold text-base text-ink">
                Input, Select & Skeleton
              </h3>
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
            <span className="text-xs font-mono font-bold text-action uppercase">
              2b. Molecules
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Compound Molecules (components/molecules/)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SearchBar & QuantitySelector */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                SearchBar & QuantitySelector
              </h3>
              <SearchBar placeholder="Type to test debounced search..." />
              <div className="flex items-center gap-4 pt-2">
                <QuantitySelector
                  value={qty}
                  onChange={setQty}
                  min={1}
                  max={10}
                />
                <span className="text-sm text-slate">
                  Selected quantity: {qty}
                </span>
              </div>
            </div>

            {/* Breadcrumb & StepIndicator */}
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                Breadcrumb & StepIndicator
              </h3>
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
              <h3 className="font-display font-semibold text-base text-ink">
                RadioCard & FormField
              </h3>
              <FormField
                label="Delivery Email"
                hint="We will send your order confirmation here."
              >
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
              <h3 className="font-display font-semibold text-base text-ink">
                CategoryCard & Summary
              </h3>
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
            <h3 className="font-display font-semibold text-base text-ink">
              ProductCard (2 samples)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <ProductCard product={PRODUCTS[0]} />
              <ProductCard product={PRODUCTS[2]} />
            </div>
          </div>
        </section>

        {/* 3. ORGANISMS SHOWCASE */}
        <section className="space-y-8">
          <div className="border-b border-mist pb-2">
            <span className="text-xs font-mono font-bold text-action uppercase">
              2c. Organisms
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Complex Organisms (components/organisms/)
            </h2>
          </div>

          {/* Hero Organism */}
          <Hero />

          {/* ReviewSummary & OrderTimeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                ReviewSummary
              </h3>
              <ReviewSummary rating={4.8} totalReviews={124} />
            </div>

            <div className="bg-surface p-6 rounded-md border border-mist shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-base text-ink">
                OrderTimeline
              </h3>
              <OrderTimeline status="in_transit" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
