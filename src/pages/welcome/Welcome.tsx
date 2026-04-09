'use client';

import './Welcome.css';
import { useNavigate } from 'react-router-dom';

import TokenQueue from '../../components/token/Token';
import HomeWelcomeCarousel from '../../components/carousel/Carousel';
import { useAds } from '../../hooks/queries/useAds';
import { ROUTES } from '../../utils/routeConstants';
import { navigateWithDirection } from '../../utils/commonFunctions';
import {
  useTokens,
  useNextTokens,
  useEmergencyTokens,
  useCurrentTokens,
  useCompletedTokens,
} from '../../hooks/queries/useTokens';
import { useMemo } from 'react';

export default function HomeWelcome() {
  // 🔥 source query
  useTokens();
  const { data, isError, isLoading } = useAds();
  const { data: generalTokens } = useNextTokens();
  const { data: emergencyTokens } = useEmergencyTokens();
  const { data: currentToken } = useCurrentTokens();
  const { data: completedToken } = useCompletedTokens();
  const navigate = useNavigate();

  const handleStart = () => {
    navigateWithDirection(navigate, '/' + ROUTES.DEPARTMENTS, 1);
  };

  const ads = data?.data ?? [];

  const progress = useMemo(() => {
    return [
      ...(completedToken ?? []),
      ...(currentToken ?? []),
      ...(emergencyTokens ?? []),
      ...(generalTokens ?? []),
    ];
  }, [completedToken, currentToken, emergencyTokens, generalTokens]);

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
        <TokenQueue queueProgress={progress} />
      </footer>
    </div>
  );
}
