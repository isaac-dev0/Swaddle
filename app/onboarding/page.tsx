import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function Onboarding() {
  return (
    <div className="min-h-screen w-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] max-w-390">
        <OnboardingWizard />
      </div>
    </div>
  );
}
