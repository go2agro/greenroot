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
  overall_status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  current_step: number;
  cover_letter: string;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
  internships?: Internship;
  application_steps?: ApplicationStep[];
}

export type ApplicationStepName = 
  | 'cv_screening' 
  | 'interview' 
  | 'academic' 
  | 'financials' 
  | 'visa' 
  | 'relocation' 
  | 'final_review';

export type ApplicationStepStatus = 'not_started' | 'in_progress' | 'completed';

export interface ApplicationStep {
  id: string;
  application_id: string;
  step_name: ApplicationStepName;
  step_number: number;
  status: ApplicationStepStatus;
  data: Record<string, any>;
  documents: string[];
  notes: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationStepConfig {
  name: ApplicationStepName;
  number: number;
  title: string;
  description: string;
  fields: ApplicationStepField[];
  documents: ApplicationStepDocument[];
}

export interface ApplicationStepField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'number' | 'email' | 'tel';
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  helperText?: string;
}

export interface ApplicationStepDocument {
  name: string;
  label: string;
  required: boolean;
  acceptedFormats: string[];
  maxSize: number;
  description: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
  date_of_birth: string | null;
  mobile_number: string | null;
  profile_picture: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  country: string | null;
  university_college: string | null;
  major_specialization: string | null;
  degree: string | null;
  tenure_status: 'ongoing' | 'completed' | null;
  aadhar_number: string | null;
  pan_number: string | null;
  passport_id: string | null;
  created_at: string;
  updated_at: string;
}
