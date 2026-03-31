'use client';

import './Welcome.css';
import { useNavigate } from 'react-router-dom';

import TokenQueue, { type Token } from '../../components/token/Token';
import HomeWelcomeCarousel from '../../components/carousel/Carousel';
import { useAds } from '../../hooks/queries/useAds';
import { ROUTES } from '../../utils/routeConstants';

export default function HomeWelcome() {
  const { data, isError, isLoading } = useAds();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/' + ROUTES.CHECK_IN_DETAILS);
  };

  const ads = data?.data ?? [];

  // Mocking queue progress as seen in HTML
  const queueProgress: Token[] = [
    { token: 'A-142', status: 'COMPLETED', current: false },
    { token: 'A-143', status: 'CURRENT', current: true },
    { token: 'E-09', status: 'EMERGENCY', emergency: true },
    { token: 'A-144', status: 'NEXT', next: true, est: '5 min' },
    { token: 'A-145', status: 'NEXT', next: true, est: '5 min' },
  ];

  return (
    <div className='home-welcome'>
      <header className={'home-welcome__header'} onClick={handleStart}>
        {isError || isLoading ? (
          <div className='home-welcome__ads-loading--container'>
            <p>
              {isLoading ? (
                'Loading ads..'
              ) : (
                <>
                  Welcome! <br /> Tap to continue
                </>
              )}
            </p>
          </div>
        ) : (
          <HomeWelcomeCarousel items={ads} onStart={handleStart} />
        )}
      </header>

      {/* Bottom Section: Token Queue Progress */}
      <footer className='home-welcome__footer'>
        <TokenQueue queueProgress={queueProgress} />
      </footer>
    </div>
  );
}
