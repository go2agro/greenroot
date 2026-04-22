import ProfileCompletionCard from '@/components/ProfileCompletionCard';

export default async function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProfileCompletionCard currentStep={1} />
    </div>
  );
}
