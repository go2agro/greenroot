import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') {
    redirect('/admin/dashboard');
  }

  return (
    <DashboardLayout 
      userRole="student" 
      userName={profile?.full_name || user.email?.split('@')[0]} 
      userImage={profile?.profile_picture}
    >
      {children}
    </DashboardLayout>
  );
}
