'use client';

import { useEffect, useState } from 'react';
import StudentsListClient from '@/components/admin/StudentsListClient';
import { useSearchParams } from 'next/navigation';

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

export default function AdminStudentsPageClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await fetch(`/api/admin/students?page=${currentPage}&limit=${itemsPerPage}&offset=${offset}`);
        const data = await response.json();
        
        setStudents(data.students || []);
        setTotalStudents(data.count || 0);
        setTotalPages(Math.ceil((data.count || 0) / itemsPerPage));
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
        <p className="text-gray-600 mt-2">View and manage all registered students on the platform.</p>
      </div>

      <StudentsListClient
        students={students}
        currentPage={currentPage}
        totalPages={totalPages}
        totalStudents={totalStudents}
      />
    </div>
  );
}
