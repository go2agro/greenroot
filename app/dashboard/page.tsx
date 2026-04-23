import BannerAdsCarousel from '@/components/dashboard/widgets/BannerAdsCarousel';
import GreetingWidget from '@/components/dashboard/widgets/GreetingWidget';
import ProfileCompletionCard from '@/components/ProfileCompletionCard';
import StepperProgress from '@/components/ui/StepperProgress';

export default async function DashboardPage() {
  return (
    <div>
      <BannerAdsCarousel showIndicators={false} />
      <GreetingWidget username="Shubham" />
      <ProfileCompletionCard currentStep={2} />
    </div>
  );
}
