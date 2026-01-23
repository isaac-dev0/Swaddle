import { Search, Palette, CheckCircle, Rocket } from "lucide-react";

export function ProcessStep() {
  const phases = [
    {
      number: 1,
      title: "Discovery & Planning",
      description: "We start by understanding your needs and defining clear objectives for the project.",
      icon: Search,
      delay: "0ms",
    },
    {
      number: 2,
      title: "Design & Development",
      description: "Our team creates mockups and prototypes, then builds your solution with iterative feedback.",
      icon: Palette,
      delay: "100ms",
    },
    {
      number: 3,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing ensures everything works perfectly before launch.",
      icon: CheckCircle,
      delay: "200ms",
    },
    {
      number: 4,
      title: "Launch & Support",
      description: "We deploy your solution and provide ongoing support to ensure continued success.",
      icon: Rocket,
      delay: "300ms",
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-bold text-3xl md:text-4xl">How We Work Together</h2>
        <p className="text-muted-foreground text-lg">
          Our proven process ensures successful collaboration and exceptional results
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === phases.length - 1;

          return (
            <div
              key={phase.number}
              className="relative animate-fade-in-up"
              style={{ animationDelay: phase.delay }}
            >
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
              )}

              {/* Phase Content */}
              <div className="flex gap-4 md:gap-6 pb-8 md:pb-12 last:pb-0">
                {/* Number Circle with Icon */}
                <div className="relative flex-shrink-0">
                  <div className="size-10 md:size-12 rounded-full border-4 border-primary bg-background flex items-center justify-center text-primary font-bold z-10 relative">
                    {phase.number}
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-primary/10 blur-sm -z-10" />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-xl border bg-card p-5 md:p-6 hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="size-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg md:text-xl">{phase.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Callout */}
      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6 animate-fade-in-up [animation-delay:400ms]">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">4-6 weeks</div>
            <div className="text-sm text-muted-foreground mt-1">Average Timeline</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
