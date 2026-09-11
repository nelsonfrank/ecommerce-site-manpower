"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useRegisterMutation } from "@/lib/api/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/molecules/FormField";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/api/types";

export default function RegisterPage() {
  const router = useRouter();
  const showToast = useStore((state) => state.showToast);

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreedToTerms, setAgreedToTerms] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const registerMutation = useRegisterMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage("Please accept the terms and conditions to continue.");
      return;
    }

    registerMutation.mutate(
      { fullName: fullName.trim(), email: email.trim(), password },
      {
        onSuccess: (data) => {
          showToast({
            message: `Welcome to North & Co., ${data.user.fullName.split(" ")[0]}!`,
          });
          router.push("/dashboard/profile");
        },
        onError: (err) => {
          const axiosErr = err as AxiosError<ApiErrorResponse>;
          const msg = axiosErr.response?.data?.message;
          setErrorMessage(
            Array.isArray(msg)
              ? msg[0]
              : (msg ?? "Registration failed. Please try again.")
          );
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="text-center space-y-1.5">
        <h1 className="font-display font-semibold text-2xl sm:text-[28px] tracking-[-0.03em] text-ink">
          Create an account
        </h1>
        <p className="font-sans text-sm text-slate">
          Join North &amp; Co. to track orders, save favorites, and check out faster.
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

          <FormField label="Full name" htmlFor="register-name">
            <Input
              id="register-name"
              type="text"
              placeholder="Jordan Reyes"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </FormField>

          <FormField label="Email address" htmlFor="register-email">
            <Input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="register-password"
            hint="Must be at least 6 characters."
          >
            <Input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </FormField>

          <FormField label="Confirm password" htmlFor="register-confirm">
            <Input
              id="register-confirm"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </FormField>

          <div className="pt-1">
            <Checkbox
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              label={
                <span className="text-xs text-slate">
                  I agree to the{" "}
                  <Link href="/" className="underline text-ink hover:text-action">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/" className="underline text-ink hover:text-action">
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </div>

          <div className="pt-2">
            <Button type="submit" fullWidth disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Sign-in Link */}
      <p className="text-center text-sm text-slate">
        Already have an account?{" "}
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
