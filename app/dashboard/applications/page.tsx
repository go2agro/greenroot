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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">Track the status of your internship applications.</p>
      </div>

      {applications && applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {app.internships?.title}
                    </h2>
                    <p className="text-primary-600 font-medium mb-2">{app.internships?.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold mb-2 ${
                        app.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : app.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(app.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Cover Letter</h3>
                  <p className="text-gray-700 line-clamp-3">{app.cover_letter}</p>
                </div>

                <div className="mt-4 flex gap-4">
                  <Link
                    href={`/dashboard/internships/${app.internship_id}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                  >
                    View Internship Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
