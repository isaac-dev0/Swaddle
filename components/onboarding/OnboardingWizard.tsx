"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperNext,
  StepperPrev,
  type StepperProps,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import { WelcomeStep } from "./steps/WelcomeStep";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.email("Please enter a valid phone number.").optional(),
  organisation: z.string().min(2, "Organisation must be at least 2 characters"),
  jobRole: z.string(),
  isOnboarded: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

const steps = [
  {
    value: "welcome",
    title: "Welcome",
    description: "Learn a bit about the system",
  },
  {
    value: "about",
    title: "Professional Details",
    description: "Tell us more about yourself",
    fields: [
      "firstName",
      "lastName",
      "phone",
      "organisation",
      "jobRole",
    ] as const,
  },
  {
    value: "process",
    title: "Our Workflow",
    description: "Understanding our workflow",
  },
  {
    value: "guidelines",
    title: "Our Guidelines",
    description: "Understanding our guidelines",
  },
  {
    value: "start",
    title: "Getting Started",
    description: "Let's get started",
  },
];

export function OnboardingWizard() {
  const [step, setStep] = React.useState("welcome");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      organisation: "",
      jobRole: "",
    },
  });

  const stepIndex = steps.findIndex((s) => s.value === step);

  const onValidate: NonNullable<StepperProps["onValidate"]> = React.useCallback(
    async (_value, direction) => {
      if (direction === "prev") return true;

      const stepData = steps.find((s) => s.value === step);
      if (!stepData) return true;

      const isValid = await form.trigger(stepData.fields);

      if (!isValid) {
        toast.info("Please complete all required fields to continue");
      }

      return isValid;
    },
    [form, step],
  );

  const onSubmit = React.useCallback((input: FormSchema) => {
    toast.success(
      <pre className="w-full">{JSON.stringify(input, null, 2)}</pre>,
    );
  }, []);

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper
          value={step}
          onValueChange={setStep}
          onValidate={onValidate}
          orientation="horizontal"
        >
          <StepperList>
            {steps.map((step) => (
              <StepperItem key={step.value} value={step.value}>
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col gap-px">
                    <StepperTitle>{step.title}</StepperTitle>
                    <StepperDescription>{step.description}</StepperDescription>
                  </div>
                </StepperTrigger>
                <StepperSeparator className="mx-4" />
              </StepperItem>
            ))}
          </StepperList>
          <StepperContent value="welcome">
            <WelcomeStep />
          </StepperContent>
          <StepperContent value="about">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="min-h-30"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a brief description about yourself.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </StepperContent>
          <StepperContent value="process">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Your personal or company website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperContent>
          <StepperContent value="guidelines">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Your personal or company website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperContent>
          <StepperContent value="start">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Your personal or company website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperContent>
          <div className="mt-4 flex justify-between">
            <StepperPrev asChild>
              <Button variant="outline">Previous</Button>
            </StepperPrev>
            <div className="text-muted-foreground text-sm">
              Step {stepIndex + 1} of {steps.length}
            </div>
            {stepIndex === steps.length - 1 ? (
              <Button type="submit">Complete</Button>
            ) : (
              <StepperNext asChild>
                <Button>Next</Button>
              </StepperNext>
            )}
          </div>
        </Stepper>
      </form>
    </Form>
  );
}
