import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { checkProfileCompletion } from '@/lib/utils/profile';
import { Profile } from '@/types';
import InternshipDetailClient from '@/components/dashboard/InternshipDetailClient';

export default async function InternshipDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: internship } = await supabase
    .from('internships')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!internship) {
    notFound();
  }

  const { data: existingApplication } = await supabase
    .from('applications')
    .select('*')
    .eq('student_id', user?.id)
    .eq('internship_id', params.id)
    .single();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const profileStatus = checkProfileCompletion(profile as Profile);

  return (
    <InternshipDetailClient 
      internship={internship}
      existingApplication={existingApplication}
      profileStatus={profileStatus}
    />
  );
}
