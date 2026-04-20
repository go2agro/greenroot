import { createClient } from '@/lib/supabase/server';
import InternshipsClient from '@/components/dashboard/InternshipsClient';

export default async function InternshipsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: internships } = await supabase
    .from('internships')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  let savedInternshipIds: string[] = [];
  if (user) {
    const { data: savedInternships } = await supabase
      .from('saved_internships')
      .select('internship_id')
      .eq('student_id', user.id);
    
    savedInternshipIds = savedInternships?.map(s => s.internship_id) || [];
  }

  return <InternshipsClient internships={internships || []} savedInternshipIds={savedInternshipIds} />;
}
