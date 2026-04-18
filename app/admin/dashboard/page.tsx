import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: internships } = await supabase
    .from('internships')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: applications } = await supabase
    .from('applications')
    .select('*');

  const { data: students } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student');

  const stats = {
    totalInternships: internships?.length || 0,
    activeInternships: internships?.filter(i => i.is_active).length || 0,
    totalApplications: applications?.length || 0,
    pendingApplications: applications?.filter(app => app.status === 'pending').length || 0,
    totalStudents: students?.length || 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage internships, applications, and students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Internships</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalInternships}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeInternships}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Applications</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingApplications}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Students</p>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent Internships</h2>
              <Link
                href="/admin/internships/create"
                className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
              >
                + Add New
              </Link>
            </div>
          </div>
          <div className="p-6">
            {internships && internships.length > 0 ? (
              <div className="space-y-4">
                {internships.slice(0, 5).map((internship) => (
                  <div key={internship.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{internship.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          internship.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {internship.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{internship.company}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {internship.location} • {internship.duration}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No internships yet</p>
                <Link
                  href="/admin/internships/create"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Create First Internship
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              href="/admin/internships"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Internships</p>
                  <p className="text-sm text-gray-600">Create and edit opportunities</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/admin/applications"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Review Applications</p>
                  <p className="text-sm text-gray-600">Approve or reject submissions</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/admin/students"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👥</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View Students</p>
                  <p className="text-sm text-gray-600">Manage student accounts</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
