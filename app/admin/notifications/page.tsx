import { createClient } from '@/lib/supabase/server';

export default async function AdminNotificationsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600 mb-8">Stay updated with system activities</p>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-gray-500 text-lg">No new notifications</p>
          <p className="text-gray-400 text-sm mt-2">We&apos;ll notify you when something arrives</p>
        </div>
      </div>
    </div>
  );
}
