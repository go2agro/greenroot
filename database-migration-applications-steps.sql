-- Database Migration: Add application steps tracking
-- Run this SQL in your Supabase SQL Editor

-- Create application_steps table to track each step of the application process
CREATE TABLE IF NOT EXISTS application_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL CHECK (step_name IN ('cv_screening', 'interview', 'academic', 'financials', 'visa', 'relocation', 'final_review')),
  step_number INTEGER NOT NULL CHECK (step_number BETWEEN 1 AND 7),
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  data JSONB DEFAULT '{}',
  documents JSONB DEFAULT '[]',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(application_id, step_name)
);

-- Add new columns to applications table
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS current_step INTEGER DEFAULT 1 CHECK (current_step BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS overall_status TEXT DEFAULT 'draft' CHECK (overall_status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected'));

-- Update existing applications to have initial step data
-- This will create 7 steps for each application
DO $$
DECLARE
  app_record RECORD;
BEGIN
  FOR app_record IN SELECT id FROM applications
  LOOP
    -- Insert 7 steps for each application if they don't exist
    INSERT INTO application_steps (application_id, step_name, step_number, status)
    VALUES 
      (app_record.id, 'cv_screening', 1, 'not_started'),
      (app_record.id, 'interview', 2, 'not_started'),
      (app_record.id, 'academic', 3, 'not_started'),
      (app_record.id, 'financials', 4, 'not_started'),
      (app_record.id, 'visa', 5, 'not_started'),
      (app_record.id, 'relocation', 6, 'not_started'),
      (app_record.id, 'final_review', 7, 'not_started')
    ON CONFLICT (application_id, step_name) DO NOTHING;
  END LOOP;
END $$;

-- Create function to automatically create steps when a new application is created
CREATE OR REPLACE FUNCTION create_application_steps()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO application_steps (application_id, step_name, step_number, status)
  VALUES 
    (NEW.id, 'cv_screening', 1, 'not_started'),
    (NEW.id, 'interview', 2, 'not_started'),
    (NEW.id, 'academic', 3, 'not_started'),
    (NEW.id, 'financials', 4, 'not_started'),
    (NEW.id, 'visa', 5, 'not_started'),
    (NEW.id, 'relocation', 6, 'not_started'),
    (NEW.id, 'final_review', 7, 'not_started');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create steps
DROP TRIGGER IF EXISTS trigger_create_application_steps ON applications;
CREATE TRIGGER trigger_create_application_steps
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION create_application_steps();

-- Enable Row Level Security
ALTER TABLE application_steps ENABLE ROW LEVEL SECURITY;

-- Application steps policies
CREATE POLICY "Students can view their own application steps" ON application_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM applications 
      WHERE applications.id = application_steps.application_id 
      AND applications.student_id = auth.uid()
    )
  );

CREATE POLICY "Students can update their own application steps" ON application_steps
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM applications 
      WHERE applications.id = application_steps.application_id 
      AND applications.student_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all application steps" ON application_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all application steps" ON application_steps
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_application_steps_application_id ON application_steps(application_id);
CREATE INDEX IF NOT EXISTS idx_application_steps_status ON application_steps(status);
CREATE INDEX IF NOT EXISTS idx_application_steps_step_number ON application_steps(step_number);
CREATE INDEX IF NOT EXISTS idx_applications_current_step ON applications(current_step);
CREATE INDEX IF NOT EXISTS idx_applications_overall_status ON applications(overall_status);

-- Add comments for documentation
COMMENT ON TABLE application_steps IS 'Tracks individual steps in the application process';
COMMENT ON COLUMN application_steps.step_name IS 'Name of the application step';
COMMENT ON COLUMN application_steps.step_number IS 'Step number (1-7)';
COMMENT ON COLUMN application_steps.status IS 'Status: not_started, in_progress, completed';
COMMENT ON COLUMN application_steps.data IS 'JSON data specific to this step';
COMMENT ON COLUMN application_steps.documents IS 'Array of document URLs uploaded for this step';
COMMENT ON COLUMN application_steps.notes IS 'Additional notes for this step';
COMMENT ON COLUMN applications.current_step IS 'Current step number the student is on';
COMMENT ON COLUMN applications.overall_status IS 'Overall application status';
