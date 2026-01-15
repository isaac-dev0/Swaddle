"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import {
  BentoGrid,
  BentoItem,
  BentoItemContent,
  BentoItemTitle,
  BentoItemDescription,
  BentoItemBackground,
} from "@/components/ui/bento-grid";
import { sendOtp, verifyOtp } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-background">
      <AuthCard
        onSendOtp={async (email) => {
          await sendOtp(email);
        }}
        onVerifyOtp={async (email, otp) => {
          await verifyOtp(email, otp);
          router.push("/dashboard");
        }}
        onResendOtp={async (email) => {
          await sendOtp(email);
        }}
      />

      <div className="hidden lg:flex lg:flex-1 relative bg-background p-8">
        <BentoGrid columns={3} rows={4} className="w-full auto-rows-fr">
          <BentoItem
            colSpan={2}
            rowSpan={2}
            variant="gradient"
            className="flex-col justify-end"
          >
            <BentoItemBackground className="bg-linear-to-br from-primary/20 to-transparent blur-2xl" />
            <BentoItemContent>
              <BentoItemTitle className="mb-2 text-foreground">
                Connect with care
              </BentoItemTitle>
              <BentoItemDescription className="text-primary-foreground/80">
                Building stronger family bonds
              </BentoItemDescription>
            </BentoItemContent>
          </BentoItem>

          <BentoItem
            rowSpan={2}
            variant="gradient"
            className="flex-col justify-between"
          >
            <BentoItemBackground
              className="opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <BentoItemContent>
              <div className="text-sm text-primary-foreground/70 font-mono mb-4">
                metrics
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary" />
                </div>
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-primary/80" />
                </div>
              </div>
            </BentoItemContent>
          </BentoItem>

          {/* Bottom middle card - Metrics */}
          <BentoItem
            rowSpan={2}
            variant="gradient"
            className="flex-col justify-between"
          >
            <BentoItemBackground
              className="opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <BentoItemContent>
              <div className="text-sm text-primary-foreground/70 font-mono mb-4">
                metrics
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary" />
                </div>
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-primary/80" />
                </div>
              </div>
            </BentoItemContent>
          </BentoItem>

          <BentoItem
            colSpan={2}
            rowSpan={2}
            variant="gradient"
            className="flex-col justify-end"
          >
            <BentoItemBackground className="bg-linear-to-br from-primary/20 to-transparent blur-2xl" />
            <BentoItemContent>
              <BentoItemTitle className="mb-2 text-foreground">
                Connect with care
              </BentoItemTitle>
              <BentoItemDescription className="text-primary-foreground/80">
                Building stronger family bonds
              </BentoItemDescription>
            </BentoItemContent>
          </BentoItem>
        </BentoGrid>
      </div>
    </div>
  );
}
