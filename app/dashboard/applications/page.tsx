import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function ApplicationsPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: applications } = await supabase
    .from('applications')
    .select('*, internships(*)')
    .eq('student_id', user?.id)
    .order('created_at', { ascending: false });

  const { data: applicationSteps } = await supabase
    .from('application_steps')
    .select('*')
    .in('application_id', applications?.map(app => app.id) || []);

  const getStepsSummary = (applicationId: string) => {
    const steps = applicationSteps?.filter(step => step.application_id === applicationId) || [];
    const completed = steps.filter(s => s.status === 'completed').length;
    const inProgress = steps.filter(s => s.status === 'in_progress').length;
    const notStarted = steps.filter(s => s.status === 'not_started').length;
    return { completed, inProgress, notStarted, total: 7 };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">Track and manage your internship applications.</p>
      </div>

      {applications && applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app) => {
            const stepsSummary = getStepsSummary(app.id);
            const progressPercentage = (stepsSummary.completed / stepsSummary.total) * 100;
            
            return (
              <div key={app.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {app.internships?.title}
                      </h2>
                      <p className="text-primary-600 font-medium mb-2">{app.internships?.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {app.internships?.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {app.internships?.duration}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">Application Progress</span>
                          <span className="text-gray-600">{stepsSummary.completed}/{stepsSummary.total} Steps</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        {stepsSummary.completed > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {stepsSummary.completed} Completed
                          </span>
                        )}
                        {stepsSummary.inProgress > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            <div className="w-2 h-2 mr-1 rounded-full bg-yellow-500"></div>
                            {stepsSummary.inProgress} In Progress
                          </span>
                        )}
                        {stepsSummary.notStarted > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {stepsSummary.notStarted} Not Started
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start lg:items-end">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold mb-2 ${
                          app.overall_status === 'draft'
                            ? 'bg-gray-100 text-gray-800'
                            : app.overall_status === 'submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : app.overall_status === 'under_review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.overall_status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {app.overall_status?.replace('_', ' ').toUpperCase() || 'DRAFT'}
                      </span>
                      <p className="text-sm text-gray-500">
                        Applied on {new Date(app.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Current Step: {app.current_step || 1} of 7
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-4">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                      Continue Application →
                    </Link>
                    <Link
                      href={`/dashboard/internships/${app.internship_id}`}
                      className="text-gray-600 hover:text-gray-700 font-semibold text-sm"
                    >
                      View Internship Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Applications Yet</h2>
          <p className="text-gray-600 mb-6">Start applying to internships to see them here.</p>
          <Link
            href="/dashboard/internships"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
          >
            Browse Internships
          </Link>
        </div>
      )}
    </div>
  );
}
