import BannerAdsCarousel from '@/components/dashboard/widgets/BannerAdsCarousel';
import GreetingWidget from '@/components/dashboard/widgets/GreetingWidget';

export default async function DashboardPage() {
  return (
    <div>
      <BannerAdsCarousel showIndicators={false} />
      <GreetingWidget username="Shubham" />
    </div>
  );
}
