'use client';

import { ApplicationStep, ApplicationStepStatus } from '@/types';
import { APPLICATION_STEPS } from '@/lib/config/application-steps';

interface StepProgressProps {
  steps: ApplicationStep[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export default function StepProgress({ steps, currentStep, onStepClick }: StepProgressProps) {
  const getStepStatus = (stepNumber: number): ApplicationStepStatus => {
    const step = steps.find(s => s.step_number === stepNumber);
    return step?.status || 'not_started';
  };

  const getStepTitle = (stepNumber: number): string => {
    const config = APPLICATION_STEPS.find(s => s.number === stepNumber);
    return config?.title || `Step ${stepNumber}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Application Progress</h2>
      
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map((stepNumber) => {
          const status = getStepStatus(stepNumber);
          const title = getStepTitle(stepNumber);
          const isActive = stepNumber === currentStep;
          
          return (
            <button
              key={stepNumber}
              onClick={() => onStepClick(stepNumber)}
              className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary-50 border-2 border-primary-500' 
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                {status === 'completed' ? (
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : status === 'in_progress' ? (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
                    <div className="w-6 h-6 rounded-full bg-green-500 relative z-10"></div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">{stepNumber}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <p className={`font-semibold ${
                  isActive ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {title}
                </p>
                <p className="text-sm text-gray-600">
                  {status === 'completed' && 'Completed'}
                  {status === 'in_progress' && 'In Progress'}
                  {status === 'not_started' && 'Not Started'}
                </p>
              </div>
              
              <div className="flex-shrink-0 ml-4">
                <svg 
                  className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-800">
            You can navigate to any step by clicking on it. Make sure to save your progress before switching steps.
          </p>
        </div>
      </div>
    </div>
  );
}
