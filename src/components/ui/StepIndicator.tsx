import React from 'react';

interface StepIndicatorProps {
  currentStep?: number;
  current?: number;
  totalSteps?: number;
  total?: number;
  steps?: string[];
}

export default function StepIndicator({
  currentStep: currentStepProp,
  current,
  totalSteps: totalStepsProp,
  total,
  steps = [],
}: StepIndicatorProps) {
  const currentStep = currentStepProp ?? current ?? 1;
  const totalSteps = (totalStepsProp ?? total ?? steps.length) || 1;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center gap-2">
              {/* Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm transition-all ${
                  isCurrent
                    ? 'bg-brand-blue text-white ring-4 ring-blue-100'
                    : isCompleted
                      ? 'bg-brand-green text-white'
                      : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step label if provided */}
              {steps[index] && (
                <span
                  className={`text-xs font-medium ${
                    isCurrent
                      ? 'text-brand-blue'
                      : isCompleted
                        ? 'text-brand-green'
                        : 'text-slate-500'
                  }`}
                >
                  {steps[index]}
                </span>
              )}
            </div>

            {/* Connecting line */}
            {stepNumber < totalSteps && (
              <div
                className={`h-1 w-8 rounded-full transition-all ${
                  isCompleted ? 'bg-brand-green' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
