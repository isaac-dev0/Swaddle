import { MessageSquare, Award, RefreshCw, Heart } from "lucide-react";

export function GuidelinesStep() {
  const guidelines = [
    {
      icon: MessageSquare,
      title: "Communication",
      description: "Keep communication clear and timely. We value transparency and regular updates throughout the project.",
      delay: "0ms",
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "We maintain high standards for code quality, accessibility, and user experience in all deliverables.",
      delay: "100ms",
    },
    {
      icon: RefreshCw,
      title: "Feedback & Iteration",
      description: "Provide feedback early and often. Iterative improvement is key to achieving the best results.",
      delay: "200ms",
    },
    {
      icon: Heart,
      title: "Respect & Professionalism",
      description: "We foster a respectful, inclusive environment where everyone's contributions are valued.",
      delay: "300ms",
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-bold text-3xl md:text-4xl">Our Core Values & Guidelines</h2>
        <p className="text-muted-foreground text-lg">
          Working principles that guide our collaboration and ensure success
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {guidelines.map((guideline) => {
          const Icon = guideline.icon;

          return (
            <div
              key={guideline.title}
              className="group rounded-xl border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all animate-fade-in-up"
              style={{ animationDelay: guideline.delay }}
            >
              {/* Icon */}
              <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:rotate-3 transition-transform">
                <Icon className="size-6" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg md:text-xl">{guideline.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {guideline.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
