"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/molecules/FormField";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/account";

  const setAuth = useStore((state) => state.setAuth);
  const showToast = useStore((state) => state.showToast);

  const [email, setEmail] = React.useState("jordan@mail.com");
  const [password, setPassword] = React.useState("••••••••");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      const nameFromEmail = email.split("@")[0];
      const capitalized =
        nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      setAuth(
        {
          id: "u1",
          email: email.trim(),
          fullName: email.includes("jordan") ? "Jordan Reyes" : `${capitalized} User`,
        },
        "jwt-access-token-active"
      );

      showToast({
        message: "Successfully signed in!",
      });

      router.push(redirectPath);
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail("jordan@mail.com");
    setPassword("password123");
    setErrorMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="text-center space-y-1.5">
        <h1 className="font-display font-semibold text-2xl sm:text-[28px] tracking-[-0.03em] text-ink">
          Welcome back
        </h1>
        <p className="font-sans text-sm text-slate">
          Sign in to your account to manage orders and saved items.
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

          <FormField label="Email" htmlFor="login-email">
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </FormField>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-[13px] font-semibold text-ink select-none"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-action hover:text-action-hover transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label="Remember me for 30 days"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>

        {/* Demo Quick Fill Button */}
        <div className="mt-5 pt-4 border-t border-mist text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-slate hover:text-ink underline transition-colors cursor-pointer"
          >
            Fill with sample credentials (jordan@mail.com)
          </button>
        </div>
      </div>

      {/* Footer Registration Link */}
      <p className="text-center text-sm text-slate">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-action hover:text-action-hover underline underline-offset-2 transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="py-12 text-center text-slate">Loading sign in...</div>}>
      <LoginForm />
    </React.Suspense>
  );
}
