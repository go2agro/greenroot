'use client';

import Image from 'next/image';

interface StudentIdCardProps {
  studentId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  universityCollege?: string;
  profilePicture?: string;
  variant?: 'full' | 'compact';
}

export default function StudentIdCard({
  studentId,
  firstName,
  lastName,
  email,
  universityCollege,
  profilePicture,
  variant = 'full',
}: StudentIdCardProps) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0];

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-3 shadow-md border border-green-500/20">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={fullName}
                width={40}
                height={40}
                className="rounded-lg object-cover border-2 border-white/20"
              />
            ) : (
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border-2 border-white/20">
                <span className="text-white font-bold text-sm">
                  {fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white/90 text-xs font-medium mb-0.5">Student ID</div>
            <div className="text-white font-bold text-sm tracking-wider">{studentId}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-8 shadow-2xl border-2 border-green-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-green-700 font-bold text-sm">G</span>
              </div>
              <span className="text-white font-bold text-lg">GreenRoot</span>
            </div>
            <div className="text-green-100 text-xs tracking-wider">INTERNATIONAL PROGRAM</div>
          </div>
          <div className="text-right">
            <div className="text-green-100 text-xs mb-1">Student ID</div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <div className="text-white font-bold text-lg tracking-widest">{studentId}</div>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-6">
          <div className="relative flex-shrink-0">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={fullName}
                width={100}
                height={100}
                className="rounded-xl object-cover border-4 border-white/30 shadow-lg"
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-white/20 rounded-xl flex items-center justify-center border-4 border-white/30 shadow-lg">
                <span className="text-white font-bold text-3xl">
                  {fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex-1 space-y-3 pt-1">
            <div>
              <div className="text-green-100 text-xs mb-1">Full Name</div>
              <div className="text-white font-bold text-xl">{fullName}</div>
            </div>
            
            <div>
              <div className="text-green-100 text-xs mb-1">Email</div>
              <div className="text-white text-sm font-medium">{email}</div>
            </div>

            {universityCollege && (
              <div>
                <div className="text-green-100 text-xs mb-1">Institution</div>
                <div className="text-white text-sm font-medium">{universityCollege}</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-xs text-green-100">
            <div>Valid for all GreenRoot Programs</div>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Verified Student</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
