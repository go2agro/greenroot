'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface DashboardNavProps {
  userRole: 'student' | 'admin';
  userName?: string;
}

export default function DashboardNav({ userRole, userName }: DashboardNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const studentLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/internships', label: 'Internships', icon: '💼' },
    { href: '/dashboard/applications', label: 'My Applications', icon: '📝' },
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/internships', label: 'Manage Internships', icon: '💼' },
    { href: '/admin/applications', label: 'Applications', icon: '📝' },
    { href: '/admin/students', label: 'Students', icon: '👥' },
  ];

  const navLinks = userRole === 'admin' ? adminLinks : studentLinks;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">GR</span>
              </div>
              <span className="font-bold text-xl text-gray-900">GreenRoot</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 ${
                  pathname === link.href
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-700 hover:text-primary-600'
                } transition-colors duration-200`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-700">Hello, {userName || 'User'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 ${
                  pathname === link.href
                    ? 'text-primary-600 bg-primary-50 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                } px-3 py-2 rounded-md transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="px-3 py-2 text-gray-700">Hello, {userName || 'User'}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
