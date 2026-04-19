'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Application, ApplicationStep, Internship } from '@/types';
import { getStepByNumber } from '@/lib/config/application-steps';
import StepProgress from '@/components/applications/StepProgress';
import StepForm from '@/components/applications/StepForm';

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [application, setApplication] = useState<Application | null>(null);
  const [internship, setInternship] = useState<Internship | null>(null);
  const [steps, setSteps] = useState<ApplicationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const fetchApplicationData = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: appData, error: appError } = await supabase
        .from('applications')
        .select('*')
        .eq('id', resolvedParams.id)
        .eq('student_id', user.id)
        .single();

      if (appError) throw appError;
      if (!appData) {
        setError('Application not found');
        return;
      }

      setApplication(appData);
      setCurrentStep(appData.current_step || 1);

      const { data: internshipData, error: internshipError } = await supabase
        .from('internships')
        .select('*')
        .eq('id', appData.internship_id)
        .single();

      if (internshipError) throw internshipError;
      setInternship(internshipData);

      const { data: stepsData, error: stepsError } = await supabase
        .from('application_steps')
        .select('*')
        .eq('application_id', resolvedParams.id)
        .order('step_number', { ascending: true });

      if (stepsError) throw stepsError;
      setSteps(stepsData || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load application');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, [resolvedParams.id]);

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !application || !internship) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">Error</p>
          <p>{error || 'Application not found'}</p>
        </div>
        <Link
          href="/dashboard/applications"
          className="mt-4 inline-block text-primary-600 hover:text-primary-700"
        >
          ← Back to Applications
        </Link>
      </div>
    );
  }

  const currentStepData = steps.find(s => s.step_number === currentStep);
  const stepConfig = getStepByNumber(currentStep);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard/applications"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Applications
      </Link>

      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Details</h1>
            <p className="text-xl text-primary-600 font-semibold">{internship.title}</p>
            <p className="text-gray-600">{internship.company}</p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold mb-2 ${
                application.overall_status === 'draft'
                  ? 'bg-gray-100 text-gray-800'
                  : application.overall_status === 'submitted'
                  ? 'bg-blue-100 text-blue-800'
                  : application.overall_status === 'under_review'
                  ? 'bg-yellow-100 text-yellow-800'
                  : application.overall_status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {application.overall_status.replace('_', ' ').toUpperCase()}
            </span>
            <p className="text-sm text-gray-500">
              Applied on {new Date(application.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StepProgress
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>

        <div className="lg:col-span-2">
          {currentStepData && stepConfig ? (
            <StepForm
              step={currentStepData}
              config={stepConfig}
              applicationId={application.id}
              onSave={fetchApplicationData}
              onNext={handleNext}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Step configuration not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
