'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Student {
  id: string;
  email: string;
  student_id?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  university_college?: string;
  mobile_number?: string;
  city?: string;
  state?: string;
  country?: string;
  created_at: string;
}

interface StudentsListClientProps {
  students: Student[];
  currentPage: number;
  totalPages: number;
  totalStudents: number;
}

export default function StudentsListClient({
  students,
  currentPage,
  totalPages,
  totalStudents,
}: StudentsListClientProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsDialog(true);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) return firstName[0].toUpperCase();
    return 'S';
  };

  return (
    <>
      {showDetailsDialog && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Student Details</h3>
                <button
                  onClick={() => setShowDetailsDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                {selectedStudent.profile_picture ? (
                  <Image
                    src={selectedStudent.profile_picture}
                    alt={`${selectedStudent.first_name} ${selectedStudent.last_name}`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {getInitials(selectedStudent.first_name, selectedStudent.last_name)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h4>
                  {selectedStudent.student_id && (
                    <p className="text-sm text-gray-600">ID: {selectedStudent.student_id}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedStudent.email}</p>
                </div>

                {selectedStudent.mobile_number && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <p className="text-gray-900">{selectedStudent.mobile_number}</p>
                  </div>
                )}

                {selectedStudent.university_college && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">University/College</label>
                    <p className="text-gray-900">{selectedStudent.university_college}</p>
                  </div>
                )}

                {(selectedStudent.city || selectedStudent.state) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">
                      {[selectedStudent.city, selectedStudent.state, selectedStudent.country]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered On</label>
                  <p className="text-gray-900">
                    {new Date(selectedStudent.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsDialog(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{students.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{totalStudents}</span> students
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {student.profile_picture ? (
                        <Image
                          src={student.profile_picture}
                          alt={`${student.first_name} ${student.last_name}`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {getInitials(student.first_name, student.last_name)}
                          </span>
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {student.first_name && student.last_name
                            ? `${student.first_name} ${student.last_name}`
                            : student.email.split('@')[0]}
                        </div>
                        {student.mobile_number && (
                          <div className="text-xs text-gray-500">{student.mobile_number}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {student.student_id || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {student.university_college || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(student.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(student)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </div>
              <div className="flex space-x-2">
                {currentPage > 1 && (
                  <Link
                    href={`/admin/students?page=${currentPage - 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {currentPage < totalPages && (
                  <Link
                    href={`/admin/students?page=${currentPage + 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
