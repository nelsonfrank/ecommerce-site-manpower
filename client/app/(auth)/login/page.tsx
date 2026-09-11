"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { useLoginMutation } from "@/lib/api/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/molecules/FormField";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/lib/api/types";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard/profile";

  const showToast = useStore((state) => state.showToast);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  const loginMutation = useLoginMutation();

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

    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: (data) => {
          showToast({ message: `Welcome back, ${data.user.fullName.split(" ")[0]}!` });
          router.push(redirectPath || "/dashboard");
        },
        onError: (err) => {
          const axiosErr = err as AxiosError<ApiErrorResponse>;
          const msg = axiosErr.response?.data?.message;
          setErrorMessage(
            Array.isArray(msg) ? msg[0] : (msg ?? "Invalid email or password.")
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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>
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
