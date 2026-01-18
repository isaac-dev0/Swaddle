"use client";

import * as React from "react";
import { Birdhouse } from "lucide-react";
import { AuthEmailForm } from "./AuthEmailForm";
import { AuthOtpForm } from "./AuthOtpForm";
import { sendOtp } from "@/lib/auth/auth";

type AuthStep = "email" | "otp";

export interface AuthCardProps {
  logo?: React.ReactNode;
  name?: string;
  heading?: string;
  subheading?: string;
  otpHeading?: string;
  otpSubheading?: string;
  onSuccess?: () => void;
  termsUrl?: string;
  privacyUrl?: string;
  supportUrl?: string;
}

export function AuthCard({
  logo,
  name = "Swaddle",
  heading = "The best way to track referrals.",
  subheading = "Welcome, let's get started by entering your email below.",
  otpHeading = "Keep an eye out for a verification code.",
  otpSubheading = "Enter the 6-digit code we sent to verify your identity.",
  onSuccess,
  termsUrl = "#",
  privacyUrl = "#",
  supportUrl = "#",
}: AuthCardProps) {
  const [step, setStep] = React.useState<AuthStep>("email");
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleEmailSubmit(submittedEmail: string) {
    setError(null);
    setIsLoading(true);

    try {
      await sendOtp(submittedEmail);
      setEmail(submittedEmail);
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    setStep("email");
    setError(null);
  }

  const currentHeading = step === "email" ? heading : otpHeading;
  const currentSubheading = step === "email" ? subheading : otpSubheading;

  return (
    <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16 lg:py-16 bg-background text-foreground relative">
      <div className="mx-auto w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-row items-center justify-start mb-8 gap-2 text-primary">
          {logo ?? <Birdhouse className="size-6" aria-hidden />}
          <p className="font-bold text-lg">{name}</p>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-4xl font-medium font-heading text-foreground leading-tight mb-4">
            {currentHeading}
          </h2>
          <p className="text-muted-foreground text-md font-body font-normal leading-tight mb-4">
            {currentSubheading}
          </p>
        </div>

        {/* Error display */}
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {/* Forms */}
        {step === "email" ? (
          <AuthEmailForm
            onSubmit={handleEmailSubmit}
            isLoading={isLoading}
            termsUrl={termsUrl}
            privacyUrl={privacyUrl}
          />
        ) : (
          <AuthOtpForm
            email={email}
            onBack={handleBack}
            onSuccess={onSuccess}
          />
        )}
      </div>

      {/* Support link */}
      <div className="border-t border-border pt-6 absolute bottom-12 left-8 right-8 lg:left-16 lg:right-16">
        <p className="text-center text-sm text-muted-foreground">
          Looking for support?{" "}
          <a
            href={supportUrl}
            className="font-medium text-foreground hover:underline"
          >
            Get help
          </a>
        </p>
      </div>
    </div>
  );
}
