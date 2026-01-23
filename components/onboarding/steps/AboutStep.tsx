"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Phone, Building2, Briefcase, Check, AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWizardStep, useWizardContext } from "@/components/ui/wizard";
import { cn } from "@/lib/utils";

const aboutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  organisation: z
    .string()
    .min(2, "Organisation must be at least 2 characters"),
  jobRole: z.string().min(1, "Job role is required"),
});

export type AboutFormData = z.infer<typeof aboutSchema>;

export function AboutStep() {
  const { getStepData, currentStep } = useWizardContext();

  const form = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      organisation: "",
      jobRole: "",
    },
  });

  const watchedValues = form.watch();

  // Restore cached data when returning to this step
  React.useEffect(() => {
    if (currentStep === "about") {
      const cachedData = getStepData("about") as AboutFormData | undefined;
      if (cachedData) {
        form.reset(cachedData);
      }
    }
  }, [currentStep, getStepData, form]);

  useWizardStep({
    stepValue: "about",
    validateFn: async () => await form.trigger(),
    getDataFn: () => form.getValues(),
  });

  // Calculate progress
  const totalFields = 5;
  const completedFields = Object.entries(watchedValues).filter(
    ([key, value]) => {
      if (key === "phone") return true; // Phone is optional
      return value && value.toString().length >= 2;
    }
  ).length;
  const progress = Math.round((completedFields / totalFields) * 100);

  // Check if field is valid and touched
  const getFieldStatus = (fieldName: keyof AboutFormData) => {
    const fieldState = form.getFieldState(fieldName);
    const value = watchedValues[fieldName];
    const hasValue = value && value.toString().length > 0;
    const isValid = !fieldState.error && hasValue && fieldState.isDirty;
    const hasError = fieldState.error && fieldState.isTouched;

    return { isValid, hasError };
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-semibold text-2xl md:text-3xl">Tell us about yourself</h2>
          <p className="text-muted-foreground">
            Help us personalize your experience
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5 md:space-y-6">
          {/* Name Fields - Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                const { isValid, hasError } = getFieldStatus("firstName");
                return (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="John"
                          className={cn(
                            "pl-10 pr-10 transition-all",
                            isValid && "border-green-500/50 bg-green-500/5",
                            hasError && "animate-shake"
                          )}
                          {...field}
                        />
                        {isValid && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-green-500" />
                        )}
                        {hasError && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-destructive" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                const { isValid, hasError } = getFieldStatus("lastName");
                return (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Doe"
                          className={cn(
                            "pl-10 pr-10 transition-all",
                            isValid && "border-green-500/50 bg-green-500/5",
                            hasError && "animate-shake"
                          )}
                          {...field}
                        />
                        {isValid && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-green-500" />
                        )}
                        {hasError && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-destructive" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 hover:bg-accent/50 transition-colors"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Optional: Your contact number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Organisation Field */}
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => {
              const { isValid, hasError } = getFieldStatus("organisation");
              return (
                <FormItem>
                  <FormLabel>Organisation</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        placeholder="Acme Inc."
                        className={cn(
                          "pl-10 pr-10 transition-all",
                          isValid && "border-green-500/50 bg-green-500/5",
                          hasError && "animate-shake"
                        )}
                        {...field}
                      />
                      {isValid && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-green-500" />
                      )}
                      {hasError && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-destructive" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Job Role Field */}
          <FormField
            control={form.control}
            name="jobRole"
            render={({ field }) => {
              const { isValid, hasError } = getFieldStatus("jobRole");
              return (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        placeholder="Software Engineer"
                        className={cn(
                          "pl-10 pr-10 transition-all",
                          isValid && "border-green-500/50 bg-green-500/5",
                          hasError && "animate-shake"
                        )}
                        {...field}
                      />
                      {isValid && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-green-500" />
                      )}
                      {hasError && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-destructive" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/* Progress Indicator */}
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Profile completion</span>
            <span className="font-medium text-primary">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
