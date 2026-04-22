import React from 'react';

interface StepperProgressProps {
  steps: number;
  currentStep: number;
  labels?: string[];
  className?: string;
}

export default function StepperProgress({ 
  steps, 
  currentStep, 
  labels,
  className = '' 
}: StepperProgressProps) {
  return (
    <div className={`flex items-start w-full ${className}`}>
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isLast = index === steps - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center relative">
              {/* Connecting Line (left side) */}
              {index > 0 && (
                <div className="absolute top-5 right-full w-[200%] h-[3px] -z-0">
                  <div
                    className={`h-full ${
                      isCompleted
                        ? 'bg-green-500'
                        : 'bg-gray-300 h-[1.5px] mt-[0.75px]'
                    }`}
                  />
                </div>
              )}
              
              {/* Step Circle */}
              <div className="relative flex items-center justify-center mb-2 bg-white z-10">
                {isCompleted ? (
                  <div className="w-10 h-10 rounded-full bg-green-500 border-[6px] border-green-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isCurrent ? (
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-green-500" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-gray-300" />
                )}
              </div>
              
              {/* Step Label */}
              {labels && labels[index] && (
                <p className={`text-xs md:text-sm text-center whitespace-nowrap ${
                  isCompleted || isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}>
                  {labels[index]}
                </p>
              )}
            </div>

            {/* Connecting Line (spacer) */}
            {!isLast && (
              <div className="flex-1 h-[3px] mt-5 relative">
                <div
                  className={`h-full ${
                    stepNumber < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300 h-[1.5px] mt-[0.75px]'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
