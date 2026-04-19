'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface InternshipWithSaved {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  country: string;
  duration: string;
  stipend: string | null;
  stipend_amount: number | null;
  requirements: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  saved_at: string;
}

interface SavedInternshipsClientProps {
  internships: InternshipWithSaved[];
}

export default function SavedInternshipsClient({ internships: initialInternships }: SavedInternshipsClientProps) {
  const [internships, setInternships] = useState(initialInternships);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  const handleRemove = async (internshipId: string) => {
    if (removingIds.has(internshipId)) return;

    setRemovingIds(prev => new Set(prev).add(internshipId));

    try {
      const response = await fetch(`/api/internships/save?internship_id=${internshipId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove saved internship');
      }

      setInternships(prev => prev.filter(i => i.id !== internshipId));
      router.refresh();
    } catch (error) {
      console.error('Error removing saved internship:', error);
      alert('Failed to remove saved internship. Please try again.');
    } finally {
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(internshipId);
        return newSet;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {internships.map((internship) => {
        const isRemoving = removingIds.has(internship.id);

        return (
          <div key={internship.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-900 flex-1">{internship.title}</h2>
                <button
                  onClick={() => handleRemove(internship.id)}
                  disabled={isRemoving}
                  className={`ml-2 p-2 rounded-full transition-colors duration-200 ${
                    isRemoving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                  title="Remove from saved"
                >
                  <svg 
                    className="w-6 h-6 text-primary-600 fill-current"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <p className="text-primary-600 font-medium mb-4">{internship.company}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {internship.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {internship.duration}
                </div>
                {internship.stipend && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {internship.stipend}
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{internship.description}</p>

              <Link
                href={`/dashboard/internships/${internship.id}`}
                className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
