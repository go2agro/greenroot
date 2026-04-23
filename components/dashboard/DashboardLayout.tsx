'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  userRole: 'student' | 'admin';
  userName?: string;
  userImage?: string | null;
  children: React.ReactNode;
}

export default function DashboardLayout({ userRole, userName, userImage, children }: DashboardLayoutProps) {
  const router = useRouter();
  const supabase = createClient();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
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
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Welcome {userName || 'User'}</p>
            </div>
            {userImage ? (
              <Image
                src={userImage}
                alt={userName || 'User'}
                width={44}
                height={44}
                className="rounded-full object-cover border-2 border-green-200"
              />
            ) : (
              <div className="w-11 h-11 bg-green-600 rounded-full flex items-center justify-center border-2 border-green-200">
                <span className="text-white font-semibold text-sm">{getInitials(userName)}</span>
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden mt-2 min-h-0">
          <Sidebar userRole={userRole} />
          
          <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
