import { CheckCircle2, LayoutDashboard, FolderPlus, Headphones, Lightbulb, ArrowRight } from "lucide-react";

export function StartStep() {
  const actionCards = [
    {
      icon: LayoutDashboard,
      title: "Access Your Dashboard",
      description: "Explore your personalized dashboard and get familiar with the platform's features.",
      delay: "100ms",
    },
    {
      icon: FolderPlus,
      title: "Start Your First Project",
      description: "Ready to begin? Create your first project and put what you've learned into action.",
      delay: "200ms",
    },
    {
      icon: Headphones,
      title: "Get Support",
      description: "Need help? Our support team is available to answer questions and provide guidance.",
      delay: "300ms",
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Hero Success Section */}
      <div className="relative flex flex-col items-center gap-6 text-center py-8">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-40 bg-green-500/10 rounded-full blur-3xl animate-pulse" />

        {/* Success Icon */}
        <div className="relative animate-scale-in">
          <div className="size-20 md:size-24 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="size-12 md:size-16 text-green-500" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3 relative z-10">
          <h2 className="font-bold text-4xl md:text-5xl">You're All Set!</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Welcome aboard! You've completed the onboarding process and you're ready to get started.
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {actionCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group flex items-start gap-4 rounded-xl border bg-card p-5 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer animate-fade-in-up"
              style={{ animationDelay: card.delay }}
            >
              {/* Icon */}
              <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Icon className="size-6" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Arrow Indicator */}
              <ArrowRight className="size-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all flex-shrink-0 mt-3" />
            </div>
          );
        })}
      </div>

      {/* Pro Tip Callout */}
      <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-5 animate-fade-in-up [animation-delay:400ms]">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Lightbulb className="size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-medium text-sm">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              Click "Complete" below to finish setup and access your personalized dashboard. You can always revisit these settings later from your account preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
