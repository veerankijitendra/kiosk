import type { AdsResponseType } from '../../types';
import './Carousel.css';

import React, { useEffect, useMemo, useRef, useState } from 'react';

interface HomeWelcomeCarouselProps {
  items: AdsResponseType['data'];
  onStart?: () => void;
  autoPlay?: boolean;
  showIndicators?: boolean;
  showCTA?: boolean;
  ctaText?: string;
  className?: string;
  baseUrl?: string; // Base URL for your media files
}

const HomeWelcomeCarousel: React.FC<HomeWelcomeCarouselProps> = ({
  items,
  onStart,
  baseUrl = import.meta.env.VITE_CLOUDFRONT_URL || '',
  showIndicators = true,
  showCTA = true,
  ctaText = 'Get Started',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeItems = useMemo(() => items.filter((item) => item.isActive), [items]);

  const currentItem = activeItems[currentIndex];

  // Reset video refs when items change
  useEffect(() => {
    videoRefs.current = new Array(activeItems.length).fill(null);
  }, [activeItems.length]);

  // Get media URL
  const getMediaUrl = (fileKey: string) => {
    return `${baseUrl}/${fileKey}`;
  };

  useEffect(() => {
    if (!currentItem) return;

    if (currentItem.type === 'image') {
      const timer = setTimeout(
        () => {
          setCurrentIndex((prev) => (prev + 1) % activeItems.length);
        },
        (currentItem.duration || 10) * 1000,
      );

      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentItem, activeItems.length]);

  // Pause videos when not active
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  }, [currentIndex]);

  const handleCTAClick = () => {
    if (onStart) {
      onStart();
    }
  };

  const goToSlide = (index: number) => {
    if (index !== currentIndex && index >= 0 && index < activeItems.length) {
      setCurrentIndex(index);
    }
  };

  if (!currentItem || activeItems.length === 0) {
    return (
      <div className='home-welcome__loading' onClick={handleCTAClick}>
        <div className='home-welcome__loading-spinner'></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <>
      {/* Background Overlay */}
      <div className='home-welcome__overlay'></div>

      {/* Background Media */}
      <div className='home-welcome__background'>
        {currentItem.type === 'image' && (
          <img
            src={getMediaUrl(currentItem.fileKey)}
            alt={currentItem.title || 'Welcome image'}
            className='home-welcome__background-image'
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        )}
        {currentItem.type === 'video' && (
          <video
            className='home-welcome__background-video'
            controls={false}
            style={{
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
            // Fallback for autoplay issues
            onError={(e) => {
              console.error('Video failed to load:', e);
              setIsLoading(false);
            }}
            ref={(el) => {
              videoRefs.current[0] = el;
            }}
            key={currentIndex}
            src={getMediaUrl(currentItem.fileKey)}
            playsInline
            muted
            autoPlay
            preload='metadata'
            loop={activeItems.length === 1}
            onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
            onLoadedData={() => setIsLoading(false)}
            onEnded={() => {
              if (activeItems.length > 1) {
                setCurrentIndex((prev) => (prev + 1) % activeItems.length);
              }
            }}
          />
        )}

        {/* Loading Spinner */}
        {isLoading && <div className='home-welcome__loading-spinner'></div>}
      </div>

      {/* Progress Bar for Images */}
      {/* {autoPlay && currentItem.type === 'image' && (
        <div className='home-welcome__progress'>
          <div
            className='home-welcome__progress-bar'
            style={{
              animationDuration: `${currentItem.duration || 10}s`,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          />
        </div>
      )} */}
      {showIndicators && activeItems.length > 1 && (
        <div className='home-welcome__indicators'>
          {activeItems.map((_, idx) => (
            <button
              key={idx}
              className={`home-welcome__indicator ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {showCTA && onStart && (
        <div className='home-welcome__cta-wrapper'>
          <button className='home-welcome__cta-button' onClick={handleCTAClick}>
            {ctaText}
          </button>
        </div>
      )}
    </>
  );
};

export default HomeWelcomeCarousel;
