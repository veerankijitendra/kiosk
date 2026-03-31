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
  autoPlay = true,
  baseUrl = import.meta.env.VITE_CLOUDFRONT_URL || '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // Auto-advance logic
  useEffect(() => {
    if (!autoPlay || !isPlaying || !currentItem) return;

    const advanceToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length);
    };

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer based on media type
    if (currentItem.type === 'image') {
      // For images, use the duration from API (in seconds)
      const duration = (currentItem.duration || 10) * 1000;
      timerRef.current = setTimeout(advanceToNext, duration);
    } else if (currentItem.type === 'video') {
      // For videos, wait for video to end
      const videoElement = videoRefs.current[currentIndex];
      if (videoElement) {
        const handleVideoEnd = () => {
          advanceToNext();
        };
        videoElement.addEventListener('ended', handleVideoEnd);

        return () => {
          videoElement.removeEventListener('ended', handleVideoEnd);
        };
      } else {
        // Fallback if video element not ready
        const duration = (currentItem.duration || 10) * 1000;
        timerRef.current = setTimeout(advanceToNext, duration);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, currentItem, autoPlay, isPlaying, activeItems]);

  // Handle media loading and playback
  useEffect(() => {
    if (!currentItem) return;

    setIsLoading(true);

    if (currentItem.type === 'video') {
      const videoElement = videoRefs.current[currentIndex];
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.load();

        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log('Video autoplay failed:', error);
              setIsLoading(false);
              // If autoplay fails, use duration fallback
              const duration = (currentItem.duration || 10) * 1000;
              timerRef.current = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % activeItems.length);
              }, duration);
            });
        }
      }
    } else if (currentItem.type === 'image') {
      // Preload image
      const img = new Image();
      img.src = getMediaUrl(currentItem.fileKey);
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        console.error('Failed to load image:', currentItem.fileKey);
        setIsLoading(false);
      };
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      });
    };
  }, []);

  const handleCTAClick = () => {
    if (onStart) {
      onStart();
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
      {/* <div className="home-welcome__overlay"></div> */}

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
            ref={(el) => {
              videoRefs.current[currentIndex] = el;
            }}
            src={getMediaUrl(currentItem.fileKey)}
            className='home-welcome__background-video'
            playsInline
            muted={true}
            loop={false}
            preload='auto'
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        )}

        {/* Loading Spinner */}
        {isLoading && <div className='home-welcome__loading-spinner'></div>}
      </div>

      {/* Progress Bar for Images */}
      {autoPlay && currentItem.type === 'image' && (
        <div className='home-welcome__progress'>
          <div
            className='home-welcome__progress-bar'
            style={{
              animationDuration: `${currentItem.duration || 10}s`,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          />
        </div>
      )}
    </>
  );
};

export default HomeWelcomeCarousel;
