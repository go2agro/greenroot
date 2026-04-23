'use client';

import { useRouter } from 'next/navigation';
import StepperProgress from '@/components/ui/StepperProgress';
import { Space } from 'lucide-react';

interface ProfileCompletionCardProps {
  currentStep?: number;
}

export default function ProfileCompletionCard({ currentStep = 1 }: ProfileCompletionCardProps) {
  const router = useRouter();
  const steps = ['Personal info', 'Address', 'Identification', 'Documents'];
  const isCompleted = currentStep > steps.length;

  const handleCompleteProfile = () => {
    router.push('/dashboard/profile');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className={`flex items-center justify-between ${!isCompleted ? 'mb-6' : ''}`}>
        <h2 className="text-xl font-semibold text-gray-900">Profile Completion</h2>
        <button
          onClick={handleCompleteProfile}
          className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
        >
          {isCompleted ? 'Completed' : 'Complete profile'}
          {!isCompleted && (
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="h-8"/>
        <StepperProgress 
          steps={4} 
          currentStep={currentStep} 
          labels={steps}
        />
    </div>
  );
}
