import { Zap, User, Sparkles } from "lucide-react";
import {
  BentoGrid,
  BentoItem,
  BentoItemContent,
  BentoItemDescription,
  BentoItemTitle,
} from "@/components/ui/bento-grid";

export function WelcomeStep() {
  return (
    <div className="flex mt-16 mb-8 flex-col gap-8 animate-fade-in-up items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-bold text-4xl md:text-5xl">
          Welcome to Swaddle!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're excited to have you here. This quick onboarding process will
          help you get started and make the most of our platform.
        </p>
      </div>

      <div>
        <BentoGrid columns={2} className="gap-4">
          <BentoItem variant="default" className="animate-fade-in-up [animation-delay:100ms]">
            <BentoItemContent className="gap-3">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Zap className="size-6" />
              </div>
              <div className="flex-1">
                <BentoItemTitle className="text-xl mb-2">Quick Setup</BentoItemTitle>
                <BentoItemDescription>
                  Get started in just 3-5 minutes with our streamlined onboarding process.
                </BentoItemDescription>
              </div>
            </BentoItemContent>
          </BentoItem>

          {/* Personalized Experience Card */}
          <BentoItem variant="default" className="animate-fade-in-up [animation-delay:200ms]">
            <BentoItemContent className="gap-3">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <User className="size-6" />
              </div>
              <div className="flex-1">
                <BentoItemTitle className="text-xl mb-2">Personalized Experience</BentoItemTitle>
                <BentoItemDescription>
                  We'll tailor the platform to your needs and preferences.
                </BentoItemDescription>
              </div>
            </BentoItemContent>
          </BentoItem>

          {/* Get Started Card - Full Width Gradient */}
          <BentoItem
            variant="gradient"
            colSpan={2}
          >
            <BentoItemContent className="gap-4 items-center justify-center text-center w-full">
              <div className="size-16 rounded-2xl bg-primary/20 text-primary-foreground flex items-center justify-center">
                <Sparkles className="size-6" />
              </div>
              <div>
                <BentoItemTitle className="text-2xl font-heading mb-2 text-primary-foreground">
                  Ready to Begin?
                </BentoItemTitle>
                <BentoItemDescription className="text-primary-foreground/80 text-base">
                  Click "Next" below to start your onboarding journey and unlock the full potential of our platform.
                </BentoItemDescription>
              </div>
            </BentoItemContent>
          </BentoItem>
        </BentoGrid>
      </div>
    </div>
  );
}
