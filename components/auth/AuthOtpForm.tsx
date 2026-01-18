"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendOtp, verifyOtp } from "@/lib/auth/auth";

const OtpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "Please enter all 6 digits." })
    .regex(/^\d+$/, { message: "Code must contain only numbers." }),
});

export type OtpFormValues = z.infer<typeof OtpSchema>;

export interface AuthOtpFormProps {
  email: string;
  onBack: () => void;
  onSuccess?: () => void;
}

export function AuthOtpForm({ email, onBack, onSuccess }: AuthOtpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isResending, setIsResending] = React.useState<boolean>(false);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function handleVerifyOtp(code: string): Promise<void> {
    form.clearErrors();
    setIsLoading(true);
    try {
      await verifyOtp(email, code);
      onSuccess?.();
    } catch (err) {
      form.setError("otp", {
        message: err instanceof Error ? err.message : "Invalid code",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend(): Promise<void> {
    form.clearErrors();
    setIsResending(true);
    try {
      await sendOtp(email);
    } catch (err) {
      form.setError("otp", {
        message: err instanceof Error ? err.message : "Failed to resend code",
      });
    } finally {
      setIsResending(false);
    }
  }

  async function onSubmit(values: OtpFormValues) {
    await handleVerifyOtp(values.otp);
  }

  function handleComplete(code: string) {
    form.setValue("otp", code);
    handleVerifyOtp(code);
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Use a different email
      </button>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          We sent a verification code to {""}
          <span className="text-sm font-medium text-foreground">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
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
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading || form.watch("otp").length !== 6}
            className="w-full h-11 font-normal rounded-md"
          >
            {isLoading && !isResending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-muted-foreground text-center">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || isLoading}
          className="underline hover:text-foreground transition-colors disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </p>
    </div>
  );
}
