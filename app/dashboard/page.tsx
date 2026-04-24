import { createClient } from '@/lib/supabase/server';
import BannerAdsCarousel from '@/components/dashboard/widgets/BannerAdsCarousel';
import GreetingWidget from '@/components/dashboard/widgets/GreetingWidget';
import ProfileCompletionCard from '@/components/ProfileCompletionCard';
import ActiveApplicationsWidget from '@/components/dashboard/ActiveApplicationsWidget';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name')
    .eq('id', user?.id)
    .single();

  const { data: applications } = await supabase
    .from('applications')
    .select('*, internships(title, company, location)')
    .eq('student_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <BannerAdsCarousel showIndicators={false} />
      <GreetingWidget username={profile?.first_name || 'Student'} />
      <ProfileCompletionCard currentStep={2} />
      <div className="h-4"/>
      {applications && applications.length > 0 && (
        <ActiveApplicationsWidget applications={applications} />
      )}
      
    </div>
  );
}
