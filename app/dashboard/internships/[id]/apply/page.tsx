'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const createApplication = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }

        const { data: existingApplication } = await supabase
          .from('applications')
          .select('*')
          .eq('student_id', user.id)
          .eq('internship_id', resolvedParams.id)
          .single();

        if (existingApplication) {
          router.push(`/dashboard/applications/${existingApplication.id}`);
          return;
        }

        const { data: newApplication, error: insertError } = await supabase
          .from('applications')
          .insert({
            student_id: user.id,
            internship_id: resolvedParams.id,
            cover_letter: '',
            status: 'pending',
            overall_status: 'draft',
            current_step: 1,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        router.push(`/dashboard/applications/${newApplication.id}`);
      } catch (err: any) {
        console.error('Error creating application:', err);
        router.push(`/dashboard/internships/${resolvedParams.id}`);
      } finally {
        setLoading(false);
      }
    };

    createApplication();
  }, [resolvedParams.id, router, supabase]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Creating your application...</p>
      </div>
    </div>
  );
}
