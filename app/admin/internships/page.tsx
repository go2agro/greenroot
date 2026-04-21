import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminInternshipsPage() {
  const supabase = await createClient();

  const { data: internships } = await supabase
    .from('internships')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Internships</h1>
          <p className="text-gray-600 mt-2">Create and manage internship opportunities</p>
        </div>
        <Link
          href="/admin/internships/create"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          + Create New
        </Link>
      </div>

      {internships && internships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div key={internship.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
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
              <p className="text-gray-700 font-medium mb-2">{internship.company}</p>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>📍 {internship.location}</p>
                <p>⏱️ {internship.duration}</p>
                <p>💰 {internship.stipend}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/internships/${internship.id}/edit`}
                  className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit
                </Link>
                <button
                  className="flex-1 text-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">No internships created yet</p>
          <Link
            href="/admin/internships/create"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Create your first internship
          </Link>
        </div>
      )}
    </div>
  );
}
