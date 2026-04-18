export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'student' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'student' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'student' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      internships: {
        Row: {
          id: string;
          title: string;
          description: string;
          company: string;
          location: string;
          duration: string;
          stipend: string | null;
          requirements: string[];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          company: string;
          location: string;
          duration: string;
          stipend?: string | null;
          requirements?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          company?: string;
          location?: string;
          duration?: string;
          stipend?: string | null;
          requirements?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          student_id: string;
          internship_id: string;
          status: 'pending' | 'approved' | 'rejected';
          cover_letter: string;
          resume_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          internship_id: string;
          status?: 'pending' | 'approved' | 'rejected';
          cover_letter: string;
          resume_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          internship_id?: string;
          status?: 'pending' | 'approved' | 'rejected';
          cover_letter?: string;
          resume_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
