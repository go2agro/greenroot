'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Application {
  id: string;
  internship_id: string;
  overall_status: string;
  current_step: number;
  created_at: string;
  internships: {
    title: string;
    company: string;
    location: string;
  };
}

interface ActiveApplicationsWidgetProps {
  applications: Application[];
}

export default function ActiveApplicationsWidget({ applications }: ActiveApplicationsWidgetProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDeleteClick = (appId: string) => {
    setSelectedApp(appId);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedApp) return;
    setDeleting(true);

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', selectedApp);

      if (error) throw error;

      setShowDeleteDialog(false);
      setSelectedApp(null);
      router.refresh();
    } catch (error) {
      console.error('Error deleting application:', error);
    } finally {
      setDeleting(false);
    }
  };

  const activeApplications = applications.filter(app => 
    app.overall_status !== 'draft' && app.overall_status !== 'rejected'
  );
  
  const draftApplications = applications.filter(app => 
    app.overall_status === 'draft'
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under_review':
        return { text: 'Under review', className: 'bg-yellow-100 text-yellow-800' };
      case 'submitted':
        return { text: 'Interview scheduled', className: 'bg-blue-100 text-blue-700' };
      case 'approved':
        return { text: 'Approved', className: 'bg-green-100 text-green-800' };
      default:
        return { text: status.replace('_', ' '), className: 'bg-gray-100 text-gray-800' };
    }
  };

  if (activeApplications.length === 0 && draftApplications.length === 0) {
    return null;
  }

  return (
    <>
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Draft</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to discard this draft? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedApp(null);
                }}
                disabled={deleting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {deleting ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Discard'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {activeApplications.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Active applications</h2>
            <div className="space-y-3">
              {activeApplications.slice(0, 2).map((app) => {
                const status = getStatusBadge(app.overall_status);
                return (
                  <Link
                    key={app.id}
                    href={`/dashboard/applications/${app.id}`}
                    className="flex items-center bg-white rounded-2xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-20 bg-gray-200 rounded-xl mr-4 flex-shrink-0 overflow-hidden">
                      <img
                        src={`https://source.unsplash.com/400x300/?${encodeURIComponent(app.internships.title)}`}
                        alt={app.internships.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1 truncate">{app.internships.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{app.internships.location}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                        {status.text}
                      </span>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {draftApplications.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Saved draft</h2>
            <div className="space-y-3">
              {draftApplications.slice(0, 2).map((app, index) => {
                const colors = [
                  'bg-gradient-to-br from-blue-400 to-blue-600',
                  'bg-gradient-to-br from-purple-400 to-purple-600',
                  'bg-gradient-to-br from-green-400 to-green-600',
                  'bg-gradient-to-br from-orange-400 to-orange-600',
                  'bg-gradient-to-br from-pink-400 to-pink-600',
                  'bg-gradient-to-br from-teal-400 to-teal-600',
                ];
                const bgColor = colors[index % colors.length];
                
                return (
                  <div key={app.id} className="bg-white rounded-2xl p-4">
                    <div className="flex items-start">
                      <div className={`w-24 h-20 ${bgColor} rounded-xl mr-4 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 truncate">{app.internships.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{app.internships.location}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteClick(app.id)}
                            className="text-sm text-red-500 font-semibold hover:text-red-600"
                          >
                            Discard
                          </button>
                          <Link
                            href={`/dashboard/applications/${app.id}`}
                            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                          >
                            Resume
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
