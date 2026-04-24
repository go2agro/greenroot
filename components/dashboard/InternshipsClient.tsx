'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Internship, Profile } from '@/types';
import { checkProfileCompletion } from '@/lib/utils/profile';
import { createClient } from '@/lib/supabase/client';

interface InternshipsClientProps {
  internships: Internship[];
  savedInternshipIds: string[];
}

export default function InternshipsClient({ internships, savedInternshipIds }: InternshipsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedStipend, setSelectedStipend] = useState<string>('all');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(savedInternshipIds));
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const itemsPerPage = 10;

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        const profileStatus = checkProfileCompletion(profile as Profile);
        setIsProfileComplete(profileStatus.isComplete);
      } catch (error) {
        console.error('Error checking profile:', error);
      }
    };

    checkProfile();
  }, []);

  const handleApplyClick = (e: React.MouseEvent, internshipId: string) => {
    if (!isProfileComplete) {
      e.preventDefault();
      setShowProfilePopup(true);
    }
  };

  const countries = useMemo(() => {
    const uniqueCountries = new Set(internships.map(i => i.country));
    return Array.from(uniqueCountries).sort();
  }, [internships]);

  const durations = useMemo(() => {
    const uniqueDurations = new Set(internships.map(i => i.duration));
    return Array.from(uniqueDurations).sort();
  }, [internships]);

  const stipendRanges = [
    { label: 'Below ₹15,000', min: 0, max: 14999 },
    { label: '₹15,000 - ₹20,000', min: 15000, max: 20000 },
    { label: 'Above ₹20,000', min: 20001, max: Infinity },
  ];

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      if (selectedCountry !== 'all' && internship.country !== selectedCountry) {
        return false;
      }

      if (selectedDuration !== 'all' && internship.duration !== selectedDuration) {
        return false;
      }

      if (selectedStipend !== 'all') {
        const range = stipendRanges[parseInt(selectedStipend)];
        const amount = internship.stipend_amount || 0;
        if (amount < range.min || amount > range.max) {
          return false;
        }
      }

      return true;
    });
  }, [internships, selectedCountry, selectedDuration, selectedStipend]);

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInternships = filteredInternships.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSaveToggle = async (internshipId: string) => {
    if (savingIds.has(internshipId)) return;

    setSavingIds(prev => new Set(prev).add(internshipId));
    const isSaved = savedIds.has(internshipId);

    try {
      const response = await fetch('/api/internships/save' + (isSaved ? `?internship_id=${internshipId}` : ''), {
        method: isSaved ? 'DELETE' : 'POST',
        headers: isSaved ? undefined : {
          'Content-Type': 'application/json',
        },
        body: isSaved ? undefined : JSON.stringify({ internship_id: internshipId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update saved status');
      }

      setSavedIds(prev => {
        const newSet = new Set(prev);
        if (isSaved) {
          newSet.delete(internshipId);
        } else {
          newSet.add(internshipId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling save status:', error);
      alert('Failed to update saved status. Please try again.');
    } finally {
      setSavingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(internshipId);
        return newSet;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Please complete your profile details before applying to internships.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowProfilePopup(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push('/dashboard/profile')}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Available Internships</h1>
            <p className="text-gray-600 mt-2">Browse and apply to agricultural internship opportunities.</p>
          </div>
          <Link
            href="/dashboard/internships/saved"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            Saved ({savedIds.size})
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                id="duration"
                value={selectedDuration}
                onChange={(e) => {
                  setSelectedDuration(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Durations</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="stipend" className="block text-sm font-medium text-gray-700 mb-2">
                Stipend Range
              </label>
              <select
                id="stipend"
                value={selectedStipend}
                onChange={(e) => {
                  setSelectedStipend(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Stipends</option>
                {stipendRanges.map((range, index) => (
                  <option key={index} value={index.toString()}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          {(selectedCountry !== 'all' || selectedDuration !== 'all' || selectedStipend !== 'all') && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSelectedDuration('all');
                  setSelectedStipend('all');
                  handleFilterChange();
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredInternships.length)} of {filteredInternships.length} internships
        </div>
      </div>

      {paginatedInternships.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedInternships.map((internship) => {
              const isSaved = savedIds.has(internship.id);
              const isSaving = savingIds.has(internship.id);
              
              const getCountryFlag = (country: string) => {
                const flags: Record<string, string> = {
                  'Israel': 'IL',
                  'India': 'IN',
                  'USA': 'US',
                  'United States': 'US',
                  'UK': 'GB',
                  'United Kingdom': 'GB',
                  'Canada': 'CA',
                  'Australia': 'AU',
                  'Germany': 'DE',
                  'France': 'FR',
                  'Japan': 'JP',
                  'Netherlands': 'NL',
                };
                return flags[country] || 'XX';
              };

              return (
                <div key={internship.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 p-6 relative">
                  <button
                    onClick={() => handleSaveToggle(internship.id)}
                    disabled={isSaving}
                    className={`absolute top-4 right-4 transition-all duration-200 ${
                      isSaving ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save internship'}
                  >
                    <svg 
                      className={`w-6 h-6 ${isSaved ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill={isSaved ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                      />
                    </svg>
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-8 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                      <img 
                        src={`https://flagcdn.com/w40/${getCountryFlag(internship.country).toLowerCase()}.png`}
                        alt={`${internship.country} flag`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-2xl font-bold text-green-600">{internship.country}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{internship.title}</h2>
                  
                  <p className="text-gray-500 text-base mb-6">{internship.company}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                      {internship.stipend || `₹${internship.stipend_amount?.toLocaleString('en-IN') || '0'} / mo`}
                    </span>
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                      {internship.duration}
                    </span>
                    <span className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium">
                      {internship.title.toLowerCase().includes('precision') ? 'Precision Farming' : 
                       internship.title.toLowerCase().includes('organic') ? 'Organic Farming' :
                       internship.title.toLowerCase().includes('dairy') ? 'Dairy Farming' :
                       internship.title.toLowerCase().includes('poultry') ? 'Poultry Farming' :
                       'Agriculture'}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/dashboard/internships/${internship.id}`}
                      className="flex-1 text-center py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors duration-200"
                    >
                      Details
                    </Link>
                    {isProfileComplete ? (
                      <Link
                        href={`/dashboard/internships/${internship.id}/apply`}
                        className="flex-1 text-center py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-200"
                      >
                        Apply
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleApplyClick(e, internship.id)}
                        className="flex-1 text-center py-3 bg-gray-400 text-white font-semibold rounded-full cursor-not-allowed"
                        disabled
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Previous page"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-gray-500">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Next page"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Internships Found</h2>
          <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
          <button
            onClick={() => {
              setSelectedCountry('all');
              setSelectedDuration('all');
              setSelectedStipend('all');
              handleFilterChange();
            }}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
