"use client";

import * as React from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RadioCard } from "@/components/ui/RadioCard";
import { FormField } from "@/components/molecules/FormField";

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  shippingMethod: "standard" | "express";
}

export interface CheckoutStepFormsProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onPlaceOrder: () => void;
  isSubmitting?: boolean;
  subtotal: number;
}

export function CheckoutStepForms({
  currentStep,
  onStepChange,
  onPlaceOrder,
  isSubmitting = false,
  subtotal,
}: CheckoutStepFormsProps) {
  const currency = useStore((state) => state.currency);

  const [formData, setFormData] = React.useState<CheckoutFormData>({
    email: "jordan@mail.com",
    firstName: "Jordan",
    lastName: "Reyes",
    phone: "",
    address: "12 Main St",
    city: "Springfield",
    region: "Illinois",
    postalCode: "62701",
    country: "United States",
    shippingMethod: "standard",
  });

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFreeStandard = subtotal >= 5000;

  // Step 1: Contact
  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-mist bg-surface p-5 shadow-sm">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">
            Contact information
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5">
            <FormField label="Email" fullWidth htmlFor="checkout-email">
              <Input
                id="checkout-email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </FormField>

            <FormField label="First name" htmlFor="checkout-firstname">
              <Input
                id="checkout-firstname"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Last name" htmlFor="checkout-lastname">
              <Input
                id="checkout-lastname"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Phone" fullWidth htmlFor="checkout-phone">
              <Input
                id="checkout-phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Link href="/cart" className="focus-ring rounded-sm">
            <Button variant="secondary">Back to cart</Button>
          </Link>
          <Button onClick={() => onStepChange(2)}>Continue</Button>
        </div>
      </div>
    );
  }

  // Step 2: Delivery
  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-mist bg-surface p-5 shadow-sm">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">
            Delivery address
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5">
            <FormField label="Address" fullWidth htmlFor="checkout-address">
              <Input
                id="checkout-address"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                required
              />
            </FormField>

            <FormField label="City" htmlFor="checkout-city">
              <Input
                id="checkout-city"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Region / State" htmlFor="checkout-region">
              <Input
                id="checkout-region"
                value={formData.region}
                onChange={(e) => updateField("region", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Postal code" htmlFor="checkout-postal">
              <Input
                id="checkout-postal"
                value={formData.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Country" htmlFor="checkout-country">
              <Select
                id="checkout-country"
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
              >
                <option value="United States">United States</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Germany">Germany</option>
                <option value="Kenya">Kenya</option>
              </Select>
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button variant="secondary" onClick={() => onStepChange(1)}>
            Back
          </Button>
          <Button onClick={() => onStepChange(3)}>Continue</Button>
        </div>
      </div>
    );
  }

  // Step 3: Shipping
  if (currentStep === 3) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-mist bg-surface p-5 shadow-sm">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">
            Shipping method
          </h2>
          <div className="space-y-3">
            <RadioCard
              id="ship-standard"
              name="shippingMethod"
              value="standard"
              checked={formData.shippingMethod === "standard"}
              onChange={() => updateField("shippingMethod", "standard")}
              titleText="Standard delivery"
              description={`2–5 business days · ${isFreeStandard ? "Free" : formatMoney(500, currency)}`}
            />

            <RadioCard
              id="ship-express"
              name="shippingMethod"
              value="express"
              checked={formData.shippingMethod === "express"}
              onChange={() => updateField("shippingMethod", "express")}
              titleText="Express delivery"
              description={`1–2 business days · ${formatMoney(1200, currency)}`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button variant="secondary" onClick={() => onStepChange(2)}>
            Back
          </Button>
          <Button onClick={() => onStepChange(4)}>Continue to review</Button>
        </div>
      </div>
    );
  }

  // Step 4: Review
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-mist bg-surface p-5 shadow-sm">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">
          Review & payment
        </h2>

        <div className="space-y-4">
          <RadioCard
            id="pay-card"
            name="paymentMethod"
            checked
            readOnly
            titleText="Card ending in 4242"
            description="Visa · Expires 08/28 · Secure encrypted payment"
          />

          <div>
            <Button variant="secondary" size="sm">
              Change payment method
            </Button>
          </div>

          <div className="border-t border-mist pt-4 mt-4 text-sm">
            <strong className="block text-ink font-semibold mb-1">
              Ship to
            </strong>
            <p className="text-slate leading-relaxed">
              {formData.firstName} {formData.lastName}
              <br />
              {formData.address}, {formData.city}, {formData.region}{" "}
              {formData.postalCode}, {formData.country}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          variant="secondary"
          onClick={() => onStepChange(3)}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          id="placeOrder"
          onClick={onPlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing order…" : "Place order"}
        </Button>
      </div>
    </div>
  );
}
