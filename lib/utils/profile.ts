import { Profile } from '@/types';

export interface ProfileCompletionStatus {
  isComplete: boolean;
  missingFields: string[];
  completionPercentage: number;
}

export function checkProfileCompletion(profile: Profile | null): ProfileCompletionStatus {
  if (!profile) {
    return {
      isComplete: false,
      missingFields: ['All profile information'],
      completionPercentage: 0,
    };
  }

  const requiredFields = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'date_of_birth', label: 'Date of Birth' },
    { key: 'mobile_number', label: 'Mobile Number' },
    { key: 'address_line1', label: 'Address Line 1' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'country', label: 'Country' },
    { key: 'university_college', label: 'University/College' },
    { key: 'major_specialization', label: 'Major/Specialization' },
    { key: 'degree', label: 'Degree' },
    { key: 'tenure_status', label: 'Tenure Status' },
  ];

  const missingFields: string[] = [];

  requiredFields.forEach(field => {
    const value = profile[field.key as keyof Profile];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      missingFields.push(field.label);
    }
  });

  const completionPercentage = Math.round(
    ((requiredFields.length - missingFields.length) / requiredFields.length) * 100
  );

  return {
    isComplete: missingFields.length === 0,
    missingFields,
    completionPercentage,
  };
}

export function formatMissingFields(missingFields: string[]): string {
  if (missingFields.length === 0) return '';
  if (missingFields.length === 1) return missingFields[0];
  if (missingFields.length === 2) return `${missingFields[0]} and ${missingFields[1]}`;
  
  const lastField = missingFields[missingFields.length - 1];
  const otherFields = missingFields.slice(0, -1).join(', ');
  return `${otherFields}, and ${lastField}`;
}
