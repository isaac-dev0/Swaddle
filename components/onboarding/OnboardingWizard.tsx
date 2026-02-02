"use client";

import * as React from "react";
import { toast } from "sonner";
import { Wizard } from "@/components/ui/wizard";
import { WelcomeStep } from "./steps/WelcomeStep";
import { AboutStep } from "./steps/AboutStep";
import { ProcessStep } from "./steps/ProcessStep";
import { GuidelinesStep } from "./steps/GuidelinesStep";
import { StartStep } from "./steps/StartStep";

const steps = [
  {
    value: "welcome",
    title: "Welcome",
  },
  {
    value: "about",
    title: "Details",
  },
  {
    value: "process",
    title: "Workflow",
  },
  {
    value: "guidelines",
    title: "Guidelines",
  },
  {
    value: "start",
    title: "Getting Started",
  },
];

export function OnboardingWizard() {
  const handleComplete = React.useCallback(
    async (data: Record<string, unknown>) => {
      // Here you would typically send the data to your backend
      console.log("Onboarding completed with data:", data);

      toast.success(
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Onboarding Complete!</p>
          <pre className="max-h-50 overflow-auto text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>,
      );

      // Example: Send to API
      // await updateUserProfile(data.about);
      // await markUserAsOnboarded();
    },
    [],
  );

  return (
    <div className="w-full">
      <Wizard
        steps={steps}
        onComplete={handleComplete}
        orientation="horizontal"
      >
        <WelcomeStep />
        <AboutStep />
        <ProcessStep />
        <GuidelinesStep />
        <StartStep />
      </Wizard>
    </div>
  );
}
