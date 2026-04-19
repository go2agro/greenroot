# GreenRoot Setup Guide

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account and project

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Database Setup

Run the following SQL commands in your Supabase SQL Editor to create the required tables:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'admin')) DEFAULT 'student',
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  date_of_birth DATE,
  mobile_number TEXT,
  profile_picture TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  country TEXT DEFAULT 'India',
  university_college TEXT,
  major_specialization TEXT,
  degree TEXT,
  tenure_status TEXT CHECK (tenure_status IN ('ongoing', 'completed')),
  aadhar_number TEXT,
  pan_number TEXT,
  passport_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create internships table
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  stipend TEXT,
  requirements TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, internship_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Internships policies
CREATE POLICY "Anyone can view active internships" ON internships
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage internships" ON internships
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Applications policies
CREATE POLICY "Students can view their own applications" ON applications
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create applications" ON applications
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins can view all applications" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update applications" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_internships_updated_at BEFORE UPDATE ON internships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
greenroot/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin dashboard pages
│   ├── dashboard/           # Student dashboard pages
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # Reusable components
│   ├── dashboard/           # Dashboard-specific components
│   └── navigation/          # Navigation components
├── lib/                     # Utility functions
│   └── supabase/            # Supabase client configuration
├── types/                   # TypeScript type definitions
├── middleware.ts            # Next.js middleware for auth
├── .env.example             # Environment variables template
└── package.json             # Dependencies
```

## Features

- **Landing Page**: Modern, responsive landing page with feature highlights
- **Authentication**: Secure login/signup with Supabase Auth
- **Student Dashboard**: 
  - View application statistics
  - Browse available internships
  - Submit applications with cover letters
  - Track application status
- **Admin Dashboard**:
  - Manage internships (create, edit, deactivate)
  - Review applications
  - View student accounts
  - System analytics

## User Roles

- **Student**: Can browse internships and submit applications
- **Admin**: Can manage internships, review applications, and view all students

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Deployment**: Vercel (recommended)

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## Contributing

This project follows best practices for Next.js and React development. Please ensure:
- Code is properly typed with TypeScript
- Components are fully responsive
- Authentication is properly handled
- Database queries use proper RLS policies

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ for Go2Agro
