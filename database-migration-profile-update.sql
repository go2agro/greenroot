-- Database Migration: Update profiles table with new fields
-- Run this SQL in your Supabase SQL Editor

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS middle_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS profile_picture TEXT,
ADD COLUMN IF NOT EXISTS address_line1 TEXT,
ADD COLUMN IF NOT EXISTS address_line2 TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS pincode TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'India',
ADD COLUMN IF NOT EXISTS university_college TEXT,
ADD COLUMN IF NOT EXISTS major_specialization TEXT,
ADD COLUMN IF NOT EXISTS degree TEXT,
ADD COLUMN IF NOT EXISTS tenure_status TEXT CHECK (tenure_status IN ('ongoing', 'completed')),
ADD COLUMN IF NOT EXISTS aadhar_number TEXT,
ADD COLUMN IF NOT EXISTS pan_number TEXT,
ADD COLUMN IF NOT EXISTS passport_id TEXT;

-- Make full_name optional (it's already nullable by default, but this confirms it)
-- The full_name column can remain for backward compatibility but won't be required

-- Add comments for documentation
COMMENT ON COLUMN profiles.first_name IS 'User first name';
COMMENT ON COLUMN profiles.middle_name IS 'User middle name (optional)';
COMMENT ON COLUMN profiles.last_name IS 'User last name';
COMMENT ON COLUMN profiles.gender IS 'User gender';
COMMENT ON COLUMN profiles.date_of_birth IS 'User date of birth';
COMMENT ON COLUMN profiles.mobile_number IS 'User mobile/phone number';
COMMENT ON COLUMN profiles.profile_picture IS 'URL to user profile picture';
COMMENT ON COLUMN profiles.address_line1 IS 'Address line 1';
COMMENT ON COLUMN profiles.address_line2 IS 'Address line 2';
COMMENT ON COLUMN profiles.city IS 'City';
COMMENT ON COLUMN profiles.state IS 'State';
COMMENT ON COLUMN profiles.pincode IS 'Postal/PIN code';
COMMENT ON COLUMN profiles.country IS 'Country (default: India)';
COMMENT ON COLUMN profiles.university_college IS 'University or college name';
COMMENT ON COLUMN profiles.major_specialization IS 'Major or specialization';
COMMENT ON COLUMN profiles.degree IS 'Degree program';
COMMENT ON COLUMN profiles.tenure_status IS 'Tenure status: ongoing or completed';
COMMENT ON COLUMN profiles.aadhar_number IS 'Aadhar card number';
COMMENT ON COLUMN profiles.pan_number IS 'PAN card number';
COMMENT ON COLUMN profiles.passport_id IS 'Passport ID';

-- Create indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_profiles_first_name ON profiles(first_name);
CREATE INDEX IF NOT EXISTS idx_profiles_last_name ON profiles(last_name);
CREATE INDEX IF NOT EXISTS idx_profiles_mobile_number ON profiles(mobile_number);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_state ON profiles(state);
