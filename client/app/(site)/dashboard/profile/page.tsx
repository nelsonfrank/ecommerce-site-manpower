"use client";

import * as React from "react";
import { useStore } from "@/lib/store";
import type { CurrencyCode } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/molecules/FormField";
import { ProfileHeader } from "@/components/organisms/ProfileHeader";

export default function DashboardProfilePage() {
  const user = useStore((state) => state.user);
  const setAuth = useStore((state) => state.setAuth);
  const token = useStore((state) => state.token);
  const currency = useStore((state) => state.currency);
  const setCurrency = useStore((state) => state.setCurrency);
  const showToast = useStore((state) => state.showToast);

  const [fullName, setFullName] = React.useState(user?.fullName || "Jordan Reyes");
  const [email, setEmail] = React.useState(user?.email || "jordan@mail.com");
  const [address, setAddress] = React.useState("12 Main St, Springfield, IL 62701");
  const [isSaving, setIsSaving] = React.useState(false);

  // Security password state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      if (user) {
        setAuth(
          {
            ...user,
            fullName: fullName.trim(),
            email: email.trim(),
          },
          token || "mock-token"
        );
      }
      showToast({
        message: "Profile details updated successfully!",
      });
    }, 400);
  };

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    showToast({
      message: `Store currency changed to ${newCurrency}`,
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast({ message: "Please fill in password fields." });
      return;
    }
    setIsUpdatingPassword(true);

    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      showToast({ message: "Password updated successfully!" });
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="rounded-md border border-mist bg-surface p-6 shadow-sm">
        <ProfileHeader
          name={user?.fullName || fullName}
          email={user?.email || email}
          memberSince="Member since Jan 2025"
        />
      </div>

      {/* Personal Details Form */}
      <div className="rounded-md border border-mist bg-surface p-6 shadow-sm space-y-5">
        <div>
          <h2 className="font-display font-semibold text-lg text-ink">
            Personal Details
          </h2>
          <p className="font-sans text-xs text-slate">
            Update your account information and default shipping preferences.
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full name" htmlFor="profile-fullname">
              <Input
                id="profile-fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Email address" htmlFor="profile-email">
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>
          </div>

          <FormField label="Default delivery address" htmlFor="profile-address">
            <Input
              id="profile-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormField>

          <div className="pt-2 flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving changes…" : "Save changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Preferences Section: Currency */}
      <div className="rounded-md border border-mist bg-surface p-6 shadow-sm space-y-4">
        <div>
          <h2 className="font-display font-semibold text-lg text-ink">
            Shopping Preferences
          </h2>
          <p className="font-sans text-xs text-slate">
            Select your preferred currency for display and checkout calculations sitewide.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-sm bg-paper border border-mist">
          <div>
            <strong className="text-ink font-semibold text-sm block">Display Currency</strong>
            <span className="text-slate text-xs">Currently formatting in {currency}</span>
          </div>
          <div className="w-40">
            <Select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
              aria-label="Select display currency"
            >
              <option value="USD">USD ($)</option>
              <option value="TZS">TZS (TSh)</option>
              <option value="EUR">EUR (€)</option>
              <option value="KES">KES (KSh)</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Security & Password Form */}
      <div className="rounded-md border border-mist bg-surface p-6 shadow-sm space-y-5">
        <div>
          <h2 className="font-display font-semibold text-lg text-ink">
            Security & Password
          </h2>
          <p className="font-sans text-xs text-slate">
            Change your account password regularly to keep your profile secure.
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Current password" htmlFor="curr-pass">
              <Input
                id="curr-pass"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormField>

            <FormField label="New password" htmlFor="new-pass">
              <Input
                id="new-pass"
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormField>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              disabled={isUpdatingPassword || !currentPassword || !newPassword}
            >
              {isUpdatingPassword ? "Updating…" : "Update password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
