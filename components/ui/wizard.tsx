"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

// Types
export interface WizardStep {
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
  completed?: boolean;
  skippable?: boolean;
}

export interface WizardProps {
  steps: WizardStep[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (data: Record<string, unknown>) => void | Promise<void>;
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  prevButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  allowStepClick?: boolean;
  onSkip?: (stepValue: string) => void;
}

interface StepHandler {
  validate: () => Promise<boolean>;
  getData?: () => unknown;
}

interface WizardContextValue {
  currentStep: string;
  registerStep: (
    stepValue: string,
    validateFn: () => Promise<boolean>,
    getDataFn?: () => unknown,
  ) => void;
  unregisterStep: (stepValue: string) => void;
  getStepData: (stepValue: string) => unknown;
  goToStep: (stepValue: string) => void;
}

const WizardContext = React.createContext<WizardContextValue | null>(null);

export function useWizardContext() {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error("useWizardContext must be used within a Wizard component");
  }
  return context;
}

export interface UseWizardStepOptions {
  stepValue: string;
  validateFn?: () => Promise<boolean>;
  getDataFn?: () => unknown;
}

export function useWizardStep(options: UseWizardStepOptions) {
  const { stepValue, validateFn, getDataFn } = options;
  const context = useWizardContext();

  React.useEffect(() => {
    if (validateFn) {
      context.registerStep(stepValue, validateFn, getDataFn);
    }

    return () => {
      if (validateFn) {
        context.unregisterStep(stepValue);
      }
    };
  }, [stepValue, validateFn, getDataFn, context]);
}

// Mobile Progress Dots Component
interface MobileProgressDotsProps {
  steps: WizardStep[];
  currentStepValue: string;
  completedSteps: Set<string>;
}

function MobileProgressDots({
  steps,
  currentStepValue,
  completedSteps,
}: MobileProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {steps.map((step) => {
        const isCurrent = step.value === currentStepValue;
        const isCompleted = completedSteps.has(step.value);

        return (
          <div
            key={step.value}
            className={cn(
              "size-2 rounded-full transition-all duration-200",
              isCurrent && "bg-primary scale-125",
              isCompleted && !isCurrent && "bg-primary/60",
              !isCompleted && !isCurrent && "bg-muted-foreground/30"
            )}
            aria-label={`Step ${steps.indexOf(step) + 1}${isCurrent ? " (current)" : ""}${isCompleted ? " (completed)" : ""}`}
          />
        );
      })}
    </div>
  );
}

// Mobile Step Header Component
interface MobileStepHeaderProps {
  currentStepIndex: number;
  totalSteps: number;
  currentStepTitle: string;
  currentStepDescription?: string;
  steps: WizardStep[];
  completedSteps: Set<string>;
  currentStepValue: string;
}

function MobileStepHeader({
  currentStepIndex,
  totalSteps,
  currentStepTitle,
  currentStepDescription,
  steps,
  completedSteps,
  currentStepValue,
}: MobileStepHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:hidden">
      {/* Step Counter */}
      <div className="text-center text-muted-foreground text-sm">
        Step {currentStepIndex + 1} of {totalSteps}
      </div>

      {/* Current Step Title */}
      <div className="text-center">
        <h2 className="font-semibold text-lg">{currentStepTitle}</h2>
        {currentStepDescription && (
          <p className="text-muted-foreground text-sm">
            {currentStepDescription}
          </p>
        )}
      </div>

      {/* Progress Dots */}
      <MobileProgressDots
        steps={steps}
        currentStepValue={currentStepValue}
        completedSteps={completedSteps}
      />
    </div>
  );
}

export function Wizard(props: WizardProps) {
  const {
    steps,
    value,
    defaultValue,
    onValueChange,
    onComplete,
    children,
    orientation = "horizontal",
    prevButtonText = "Previous",
    nextButtonText = "Next",
    completeButtonText = "Complete",
    allowStepClick = false,
    onSkip,
  } = props;

  const [currentStep, setCurrentStep] = React.useState(
    value ?? defaultValue ?? steps[0]?.value ?? "",
  );
  const [stepDataCache, setStepDataCache] = React.useState<
    Map<string, unknown>
  >(new Map());
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(
    new Set()
  );

  const stepHandlers = React.useRef<Map<string, StepHandler>>(new Map());

  // Sync controlled value
  React.useEffect(() => {
    if (value !== undefined) {
      setCurrentStep(value);
    }
  }, [value]);

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setCurrentStep(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  const registerStep = React.useCallback(
    (
      stepValue: string,
      validateFn: () => Promise<boolean>,
      getDataFn?: () => unknown,
    ) => {
      stepHandlers.current.set(stepValue, {
        validate: validateFn,
        getData: getDataFn,
      });
    },
    [],
  );

  const unregisterStep = React.useCallback((stepValue: string) => {
    stepHandlers.current.delete(stepValue);
  }, []);

  const getStepData = React.useCallback(
    (stepValue: string) => {
      return stepDataCache.get(stepValue);
    },
    [stepDataCache],
  );

  const goToStep = React.useCallback(
    (stepValue: string) => {
      handleValueChange(stepValue);
    },
    [handleValueChange],
  );

  const onValidate: NonNullable<StepperProps["onValidate"]> =
    React.useCallback(
      async (_targetValue, direction) => {
        // Cache current step data before navigating backward (preserve edits)
        if (direction === "prev") {
          const handler = stepHandlers.current.get(currentStep);
          if (handler?.getData) {
            const data = handler.getData();
            setStepDataCache((prev) => new Map(prev).set(currentStep, data));
          }
          return true;
        }

        setIsValidating(true);

        try {
          // Get the current step's handler
          const handler = stepHandlers.current.get(currentStep);

          // If no handler registered, it's a content-only step (auto-pass)
          if (!handler) {
            return true;
          }

          // Run validation
          const isValid = await handler.validate();

          if (!isValid) {
            toast.error("Please complete all required fields to continue", {
              duration: 4000,
            });
            return false;
          }

          // Cache validated data if getData function is provided
          if (handler.getData) {
            const data = handler.getData();
            setStepDataCache((prev) => new Map(prev).set(currentStep, data));
          }

          // Mark step as completed
          setCompletedSteps((prev) => new Set(prev).add(currentStep));

          return true;
        } finally {
          setIsValidating(false);
        }
      },
      [currentStep],
    );

  const handleComplete = React.useCallback(async () => {
    if (!onComplete) return;

    // Validate current step before completion
    const handler = stepHandlers.current.get(currentStep);
    if (handler) {
      const isValid = await handler.validate();
      if (!isValid) {
        toast.error("Please complete all required fields to continue", {
          duration: 4000,
        });
        return;
      }

      // Cache final step data
      if (handler.getData) {
        const data = handler.getData();
        setStepDataCache((prev) => new Map(prev).set(currentStep, data));
      }
    }

    // Aggregate all step data
    const allData: Record<string, unknown> = {};
    stepDataCache.forEach((data, stepValue) => {
      allData[stepValue] = data;
    });

    // Add current step data if available
    if (handler?.getData) {
      allData[currentStep] = handler.getData();
    }

    setIsSubmitting(true);
    try {
      await onComplete(allData);
    } catch (error) {
      console.error("Error completing wizard:", error);
      toast.error("An error occurred while completing the wizard", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, onComplete, stepDataCache]);

  const stepIndex = steps.findIndex((s) => s.value === currentStep);
  const isLastStep = stepIndex === steps.length - 1;

  const contextValue = React.useMemo<WizardContextValue>(
    () => ({
      currentStep,
      registerStep,
      unregisterStep,
      getStepData,
      goToStep,
    }),
    [currentStep, registerStep, unregisterStep, getStepData, goToStep],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <Stepper
        value={currentStep}
        onValueChange={handleValueChange}
        onValidate={onValidate}
        orientation={orientation}
        nonInteractive={!allowStepClick}
      >
        {/* Desktop Step List - hidden on mobile using opacity/height but kept in DOM */}
        <StepperList className="pointer-events-none h-0 overflow-hidden opacity-0 md:pointer-events-auto md:h-auto md:opacity-100 md:flex">
          {steps.map((step) => (
            <StepperItem
              key={step.value}
              value={step.value}
              disabled={step.disabled}
              completed={completedSteps.has(step.value)}
            >
              <StepperTrigger>
                <StepperIndicator />
                <div className="flex flex-col gap-px">
                  <StepperTitle>{step.title}</StepperTitle>
                  {step.description && (
                    <StepperDescription>{step.description}</StepperDescription>
                  )}
                </div>
              </StepperTrigger>
              <StepperSeparator className="mx-4" />
            </StepperItem>
          ))}
        </StepperList>

        {/* Mobile Step Header - shown only on mobile */}
        <MobileStepHeader
          currentStepIndex={stepIndex}
          totalSteps={steps.length}
          currentStepTitle={steps[stepIndex]?.title || ""}
          currentStepDescription={steps[stepIndex]?.description}
          steps={steps}
          completedSteps={completedSteps}
          currentStepValue={currentStep}
        />

        {/* Render step content from children */}
        {React.Children.map(children, (child, index) => {
          const stepValue = steps[index]?.value;
          if (!stepValue) return null;

          return (
            <StepperContent
              key={stepValue}
              value={stepValue}
              className="transition-all duration-300 ease-in-out"
            >
              {child}
            </StepperContent>
          );
        })}

        {/* Navigation Controls */}
        <div className="mt-4 flex items-center justify-between">
          <StepperPrev asChild>
            <Button variant="outline" className="group" disabled={stepIndex === 0}>
              <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
              {prevButtonText}
            </Button>
          </StepperPrev>

          {/* Desktop Step Counter - hidden on mobile */}
          <div className="hidden text-muted-foreground text-sm md:block">
            Step {stepIndex + 1} of {steps.length}
          </div>

          {/* Next/Skip/Complete Buttons */}
          <div className="flex items-center gap-2">
            {/* Skip Button - only show if step is skippable and not last step */}
            {!isLastStep && steps[stepIndex]?.skippable && (
              <Button
                variant="ghost"
                onClick={() => {
                  onSkip?.(currentStep);
                  // Move to next step without validation
                  const nextIndex = stepIndex + 1;
                  const nextStep = steps[nextIndex]?.value;
                  if (nextStep) handleValueChange(nextStep);
                }}
              >
                Skip
              </Button>
            )}

            {/* Complete or Next Button */}
            {isLastStep ? (
              <Button onClick={handleComplete} disabled={isSubmitting} className="group">
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2 group-hover:rotate-12 transition-transform" />
                    {completeButtonText}
                  </>
                )}
              </Button>
            ) : (
              <StepperNext asChild>
                <Button disabled={isValidating} className="group">
                  {isValidating ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      {nextButtonText}
                      <ArrowRight className="size-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </StepperNext>
            )}
          </div>
        </div>
      </Stepper>
    </WizardContext.Provider>
  );
}
