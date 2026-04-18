import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function InternshipDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: internship } = await supabase
    .from('internships')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!internship) {
    notFound();
  }

  const { data: existingApplication } = await supabase
    .from('applications')
    .select('*')
    .eq('student_id', user?.id)
    .eq('internship_id', params.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard/internships"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Internships
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">{internship.title}</h1>
          <p className="text-xl">{internship.company}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">{internship.location}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">{internship.duration}</p>
              </div>
            </div>

            {internship.stipend && (
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stipend</p>
                  <p className="font-semibold text-gray-900">{internship.stipend}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Internship</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{internship.description}</p>
          </div>

          {internship.requirements && internship.requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2">
                {internship.requirements.map((req: string, index: number) => (
                  <li key={index} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            {existingApplication ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-900">Already Applied</p>
                    <p className="text-green-700 text-sm">
                      Status: <span className="capitalize">{existingApplication.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={`/dashboard/internships/${params.id}/apply`}
                className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
