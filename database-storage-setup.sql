-- Storage Setup for Application Documents
-- Run this SQL in your Supabase SQL Editor

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for application documents

-- Allow authenticated users to upload their own application documents
CREATE POLICY "Users can upload their own application documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'application-documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM applications WHERE student_id = auth.uid()
  )
);

-- Allow authenticated users to view their own application documents
CREATE POLICY "Users can view their own application documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'application-documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM applications WHERE student_id = auth.uid()
  )
);

-- Allow admins to view all application documents
CREATE POLICY "Admins can view all application documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'application-documents' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow users to delete their own application documents
CREATE POLICY "Users can delete their own application documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'application-documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM applications WHERE student_id = auth.uid()
  )
);

-- Optional: Set file size limits (adjust as needed)
-- This is typically done in Supabase dashboard under Storage settings
-- Maximum file size: 10MB per file
-- Allowed MIME types: PDF, Word, Images, ZIP
