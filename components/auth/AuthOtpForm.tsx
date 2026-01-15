"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendOtp, verifyOtp } from "@/lib/auth/auth";

export interface AuthOtpFormProps {
  email: string;
  onBack: () => void;
  onResend: () => Promise<void>;
}

export function AuthOtpForm() {
  const [otp, setOtp] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isResending, setIsResending] = React.useState<boolean>(false);

  async function handleSendOtp(
    event: React.FormEvent,
    email: string
  ): Promise<void> {
    event.preventDefault();
    try {
      setIsLoading(true);
      await sendOtp(email);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOtp(email: string, otp: string) {
    try {
      setIsLoading(true);
      await verifyOtp(email, otp);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend(email: string): Promise<void> {
    try {
      setIsResending(true);
      setIsLoading(true);
      await sendOtp(email);
    } catch (error) {
      console.error(error);
    } finally {
      setIsResending(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          We sent a verification code to
        </p>
        <p className="text-sm font-medium text-foreground">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            onComplete={handleComplete}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="w-full h-11 font-normal rounded-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify code"
          )}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={isResending || isLoading}
          className="underline hover:text-foreground transition-colors disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </p>
    </>
  );
}
