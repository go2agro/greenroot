'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from './Sidebar';
import StudentIdCard from '@/components/StudentIdCard';

interface DashboardLayoutProps {
  userRole: 'student' | 'admin';
  userName?: string;
  userImage?: string | null;
  studentId?: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ userRole, userName, userImage, studentId, children }: DashboardLayoutProps) {
  const router = useRouter();
  const supabase = createClient();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (idCardRef.current && !idCardRef.current.contains(event.target as Node)) {
        setShowIdCard(false);
      }
    };

    if (showProfileMenu || showIdCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu, showIdCard]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  return (
    <>
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to login again to access your account.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                disabled={loggingOut}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loggingOut ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen overflow-hidden bg-gray-50">
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <header className="bg-green-50/50 h-20 flex items-center justify-between px-8 z-30 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl leading-none">
                <span className="text-green-600">Green</span>
                <span className="text-black">Root</span>
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider">TALENT | RESEARCH | CULTURE</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <p className="text-sm font-bold text-gray-900">Welcome {userName || 'User'}</p>
              {studentId && userRole === 'student' && (
                <button
                  onClick={() => setShowIdCard(!showIdCard)}
                  className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  ID: {studentId}
                </button>
              )}
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
              >
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName || 'User'}
                    width={44}
                    height={44}
                    className="rounded-full object-cover border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
                  />
                ) : (
                  <div className="w-11 h-11 bg-green-600 rounded-full flex items-center justify-center border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer">
                    <span className="text-white font-semibold text-sm">{getInitials(userName)}</span>
                  </div>
                )}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    href={userRole === 'admin' ? '/admin/dashboard/profile' : '/dashboard/profile'}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>View Profile</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutDialog(true);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {showIdCard && studentId && (
            <div className="absolute top-24 right-8 z-50" ref={idCardRef}>
              <div className="w-96">
                <StudentIdCard
                  studentId={studentId}
                  firstName={userName?.split(' ')[0]}
                  lastName={userName?.split(' ').slice(1).join(' ')}
                  email=""
                  variant="compact"
                />
              </div>
            </div>
          )}
        </header>

        <div className="flex flex-1 overflow-hidden mt-2 min-h-0">
          <Sidebar userRole={userRole} />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
    </>
  );
}
