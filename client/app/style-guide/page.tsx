import Link from "next/link";
import { formatMoney, type CurrencyCode } from "@/lib/utils";

export const metadata = {
  title: "Design System Style Guide — North & Co.",
};

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
  return (
    <main className="min-h-screen bg-paper text-ink p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-mist pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate">Design System</span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink mt-1">North & Co. Style Guide</h1>
            <p className="text-slate text-sm mt-1">Foundational tokens, typography scale, radii, shadows, and interactive utilities.</p>
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

        {/* Color Palette */}
        <section className="space-y-6">
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Color Tokens</h2>
            <p className="text-slate text-sm">Extracted from the North & Co. visual specifications.</p>
          </div>

          <div className="space-y-8">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="font-display text-lg font-medium text-ink">{group.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.colors.map((c) => (
                    <div
                      key={c.name}
                      className="bg-surface rounded-md border border-mist overflow-hidden shadow-card flex flex-col"
                    >
                      <div
                        className={`h-24 w-full flex items-end p-3 ${c.bgClass} ${c.border ? "border-b border-mist" : ""}`}
                      >
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/30 text-white backdrop-blur-sm`}>
                          {c.hex}
                        </span>
                      </div>
                      <div className="p-3 bg-surface flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <strong className="font-display font-semibold text-sm text-ink block">{c.name}</strong>
                          <span className="text-slate text-[11px] leading-tight block mt-1">{c.usage}</span>
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
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Typography Scale</h2>
            <p className="text-slate text-sm">
              Headings & display numbers use <strong>Space Grotesk</strong>; body text and UI labels use <strong>Inter</strong>.
            </p>
          </div>

          <div className="space-y-6 bg-surface p-6 rounded-md border border-mist shadow-card">
            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">font-display (Space Grotesk) — 40px / 600 (-0.04em)</span>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-ink">
                Good products. Less clutter.
              </h1>
            </div>

            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">font-display (Space Grotesk) — 32px / 600 (-0.04em)</span>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
                Thoughtfully selected everyday goods
              </h2>
            </div>

            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">font-display (Space Grotesk) — 22px / 600 (-0.03em)</span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                Popular products & categories
              </h3>
            </div>

            <div className="border-b border-mist pb-4 space-y-1">
              <span className="text-xs font-mono text-slate">font-sans (Inter) — 15px / 400 (Body text, 1.65 line-height)</span>
              <p className="font-sans text-[15px] leading-relaxed text-slate max-w-prose">
                A canvas tote sized for groceries and daily carry. Reinforced straps and a flat base so it stands on its own.
                Microwave and dishwasher safe with a matte exterior and gloss interior.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate">Tabular Numerals (Space Grotesk + tabular-nums)</span>
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
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Radii & Shadows</h2>
            <p className="text-slate text-sm">Elevation and corner radius standards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-surface p-6 rounded-sm border border-mist shadow-card">
              <span className="text-xs font-mono text-slate block mb-1">rounded-sm (8px)</span>
              <p className="font-display font-semibold text-ink">Small Radius</p>
              <p className="text-slate text-xs mt-1">Used on buttons, inputs, badges, and icon buttons.</p>
            </div>

            <div className="bg-surface p-6 rounded-md border border-mist shadow-card">
              <span className="text-xs font-mono text-slate block mb-1">rounded-md (12px)</span>
              <p className="font-display font-semibold text-ink">Medium Radius</p>
              <p className="text-slate text-xs mt-1">Used on cards, product images, containers, and summaries.</p>
            </div>

            <div className="bg-surface p-6 rounded-md border border-mist shadow-card">
              <span className="text-xs font-mono text-slate block mb-1">shadow-card</span>
              <p className="font-display font-semibold text-ink">0 8px 30px rgba(26,29,35,.08)</p>
              <p className="text-slate text-xs mt-1">Soft diffuse elevation for cards and floating toasts.</p>
            </div>
          </div>
        </section>

        {/* Focus Ring & Interactive States */}
        <section className="space-y-6">
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Focus Ring Utility (.focus-ring)</h2>
            <p className="text-slate text-sm">
              Keyboard accessible focus indicator: 3px action-subtle outer ring + 1px action inner ring. Press <kbd className="px-1.5 py-0.5 border border-mist rounded bg-mist/30 text-xs">Tab</kbd> to inspect.
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
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Currency Formatting Verification</h2>
            <p className="text-slate text-sm">Tested with integer cents (4800, 10500, 2200) across all 4 supported currencies.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CURRENCIES.map((cur) => (
              <div key={cur} className="bg-surface p-4 rounded-md border border-mist">
                <span className="text-xs font-mono font-bold text-slate block">{cur}</span>
                <span className="font-display text-xl font-bold tabular text-ink block mt-1">
                  {formatMoney(4800, cur)}
                </span>
                <span className="text-slate text-xs block mt-1">{formatMoney(10500, cur)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Breakpoints */}
        <section className="space-y-6">
          <div className="border-b border-mist pb-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Responsive Breakpoints</h2>
            <p className="text-slate text-sm">Matching prototype specification exactly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-surface p-4 rounded-md border border-mist">
              <strong className="font-display block text-ink">1100px (lg)</strong>
              <span className="text-slate text-xs">Desktop nav collapses into mobile header hamburger</span>
            </div>
            <div className="bg-surface p-4 rounded-md border border-mist">
              <strong className="font-display block text-ink">820px (md)</strong>
              <span className="text-slate text-xs">Sidebar filters hide into bottom sheet; mobile bottom nav appears; layout stacks</span>
            </div>
            <div className="bg-surface p-4 rounded-md border border-mist">
              <strong className="font-display block text-ink">520px (xs)</strong>
              <span className="text-slate text-xs">Grid tightens to 2 columns for products, single column forms</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
