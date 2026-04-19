export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
}

export interface Internship {
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
}

export interface SavedInternship {
  id: string;
  student_id: string;
  internship_id: string;
  created_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  internship_id: string;
  status: 'pending' | 'approved' | 'rejected';
  cover_letter: string;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}
