import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import SavedInternshipsClient from '@/components/dashboard/SavedInternshipsClient';
import { redirect } from 'next/navigation';

export default async function SavedInternshipsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: savedInternships } = await supabase
    .from('saved_internships')
    .select(`
      id,
      created_at,
      internship:internships (*)
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  const internships = savedInternships
    ?.filter(s => s.internship)
    .map(s => ({
      ...s.internship,
      saved_at: s.created_at
    })) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/dashboard/internships"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Back to internships"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Internships</h1>
            <p className="text-gray-600 mt-2">Your bookmarked internship opportunities.</p>
          </div>
        </div>
      </div>

      {internships.length > 0 ? (
        <SavedInternshipsClient internships={internships} />
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Saved Internships</h2>
          <p className="text-gray-600 mb-6">Start saving internships to keep track of opportunities you&apos;re interested in.</p>
          <Link
            href="/dashboard/internships"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Browse Internships
          </Link>
        </div>
      )}
    </div>
  );
}
