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
            <div className="flex flex-col items-center relative flex-shrink-0">
              <div className="relative flex items-center justify-center mb-2 z-10">
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white"
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
                  <div className="w-6 h-6 rounded-full bg-white border-[3px] border-[#22C55E]" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-white border-[3px] border-[#D1D5DB]" />
                )}
              </div>
              
              {labels && labels[index] && (
                <p className={`text-xs md:text-sm text-center whitespace-nowrap ${
                  isCompleted || isCurrent ? 'font-medium text-black' : 'text-gray-500'
                }`}>
                  {labels[index]}
                </p>
              )}
            </div>

            {!isLast && (
              <div className="flex-1 flex items-center mt-2.5">
                <div
                  className={`w-full ${
                    stepNumber < currentStep
                      ? 'h-[1.5px] bg-[#22C55E]'
                      : 'h-[1.5px] bg-[#D1D5DB]'
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
