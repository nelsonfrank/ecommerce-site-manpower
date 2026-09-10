"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/molecules/FormField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-md border border-mist bg-surface p-7 shadow-card space-y-4">
          <div
            className="w-14 h-14 rounded-full bg-success-bg text-success text-2xl font-bold flex items-center justify-center mx-auto select-none"
            aria-hidden="true"
          >
            ✓
          </div>

          <h1 className="font-display font-semibold text-2xl text-ink tracking-tight">
            Check your email
          </h1>

          <p className="font-sans text-sm text-slate leading-relaxed">
            We sent instructions to{" "}
            <strong className="text-ink font-semibold">{email}</strong>.
            Please follow the link in the email to set a new password.
          </p>

          <div className="pt-2">
            <Link href="/login" className="focus-ring block rounded-sm">
              <Button fullWidth>Back to sign in</Button>
            </Link>
          </div>

          <p className="text-xs text-slate pt-2">
            Didn&apos;t receive the email?{" "}
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-action hover:text-action-hover underline font-medium"
            >
              Click here to try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="text-center space-y-1.5">
        <h1 className="font-display font-semibold text-2xl sm:text-[28px] tracking-[-0.03em] text-ink">
          Reset your password
        </h1>
        <p className="font-sans text-sm text-slate">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-md border border-mist bg-surface p-6 sm:p-7 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div
              className="rounded-sm bg-error-bg text-error p-3 text-xs font-semibold leading-relaxed"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <FormField label="Email address" htmlFor="reset-email">
            <Input
              id="reset-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </FormField>

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Sending instructions…" : "Send reset instructions"}
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Back Link */}
      <p className="text-center text-sm text-slate">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-action hover:text-action-hover underline underline-offset-2 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
