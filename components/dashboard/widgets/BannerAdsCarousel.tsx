'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BannerAd {
  id: string;
  imageUrl: string;
  alt: string;
  link: string;
}

const mockBannerAds: BannerAd[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=252&h=189&fit=crop',
    alt: 'Campus Event',
    link: 'https://example.com/campus-event',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=252&h=189&fit=crop',
    alt: 'Tech Workshop',
    link: 'https://example.com/tech-workshop',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=252&h=189&fit=crop',
    alt: 'Career Fair',
    link: 'https://example.com/career-fair',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=252&h=189&fit=crop',
    alt: 'Study Group',
    link: 'https://example.com/study-group',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=252&h=189&fit=crop',
    alt: 'Internship Program',
    link: 'https://example.com/internship-program',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=252&h=189&fit=crop',
    alt: 'Library Resources',
    link: 'https://example.com/library-resources',
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=252&h=189&fit=crop',
    alt: 'Campus Event',
    link: 'https://example.com/campus-event',
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=252&h=189&fit=crop',
    alt: 'Tech Workshop',
    link: 'https://example.com/tech-workshop',
  },
  {
    id: '9',
    imageUrl: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=252&h=189&fit=crop',
    alt: 'Career Fair',
    link: 'https://example.com/career-fair',
  },
  {
    id: '10',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=252&h=189&fit=crop',
    alt: 'Study Group',
    link: 'https://example.com/study-group',
  },
  {
    id: '11',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=252&h=189&fit=crop',
    alt: 'Internship Program',
    link: 'https://example.com/internship-program',
  },
  {
    id: '12',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=252&h=189&fit=crop',
    alt: 'Library Resources',
    link: 'https://example.com/library-resources',
  },
];

interface BannerAdsCarouselProps {
  showIndicators?: boolean;
}

export default function BannerAdsCarousel({ showIndicators = true }: BannerAdsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = 252 + 16;
      const index = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = 252 + 16;
    container.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth',
    });
  };

  const handleBannerClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative mb-6">
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mockBannerAds.map((banner) => (
          <div
            key={banner.id}
            className="flex-shrink-0 snap-start"
            style={{ width: '252px', height: '189px' }}
          >
            <div 
              className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100 cursor-pointer transition-transform"
              onClick={() => handleBannerClick(banner.link)}
            >
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                fill
                className="object-cover"
                sizes="252px"
              />
            </div>
          </div>
        ))}
      </div>

      {showIndicators && (
        <div className="flex justify-center gap-2 mt-4">
          {mockBannerAds.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-green-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
