'use client';

import StepperProgress from '@/components/ui/StepperProgress';

interface ProfileCompletionCardProps {
  currentStep?: number;
}

export default function ProfileCompletionCard({ currentStep = 1 }: ProfileCompletionCardProps) {
  const steps = ['Personal Info', 'Address', 'Identification', 'Documents'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Completion</h2>
      <StepperProgress 
        steps={4} 
        currentStep={currentStep} 
        labels={steps}
      />
    </div>
  );
}
