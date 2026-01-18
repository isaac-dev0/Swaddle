"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EmailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type EmailFormValues = z.infer<typeof EmailSchema>;

export interface AuthEmailFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  termsUrl?: string;
  privacyUrl?: string;
}

export function AuthEmailForm({
  onSubmit,
  isLoading,
  termsUrl = "#",
  privacyUrl = "#",
}: AuthEmailFormProps) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmit(values: EmailFormValues) {
    await onSubmit(values.email);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 font-normal rounded-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Code"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-muted-foreground text-center">
        By using this service, you agree to our{" "}
        <a
          href={termsUrl}
          className="underline hover:text-foreground transition-colors"
        >
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a
          href={privacyUrl}
          className="underline hover:text-foreground transition-colors"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
