import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IdleModal from '../components/idle-modal/IdleModal';
import { ROUTES } from '../utils/routeConstants';
import { useKioskStore } from '../store/useKioskStore';

const IDLE_TIME = 2 * 60 * 1000;
const WARNING_TIME = 1 * 60 * 1000;
const COUNTDOWN = 60;

export default function IdleProvider({ children }: { children: React.ReactNode }) {
 const navigate = useNavigate();
 const location = useLocation();
 const clearSession = useKioskStore((store) => store.clearSession);

 const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

 const [showModal, setShowModal] = useState(false);
 const [seconds, setSeconds] = useState(COUNTDOWN);

 const IGNORED_ROUTES = ['/', `/${ROUTES.WELCOME}`];

 const isIgnoredRoute = IGNORED_ROUTES.includes(location.pathname);

 const clearAll = () => {
  if (idleTimer.current) clearTimeout(idleTimer.current);
  if (warningTimer.current) clearTimeout(warningTimer.current);
  if (intervalRef.current) clearInterval(intervalRef.current);
 };

 const startCountdown = () => {
  setShowModal(true);
  setSeconds(COUNTDOWN);

  intervalRef.current = setInterval(() => {
   setSeconds((prev) => {
    if (prev <= 1) {
     clearAll();
     //  Resetting User Data
     clearSession();
     navigate('/' + ROUTES.WELCOME);
     return 0;
    }
    return prev - 1;
   });
  }, 1000);
 };

 const resetTimer = () => {
  clearAll();
  setShowModal(false);

  warningTimer.current = setTimeout(startCountdown, WARNING_TIME);

  idleTimer.current = setTimeout(() => {
   navigate('/');
  }, IDLE_TIME);
 };

 useEffect(() => {
  // ❌ If home/login → no listeners
  if (isIgnoredRoute) {
   clearAll();
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setShowModal(false);
   return;
  }

  const events = ['click', 'touchstart', 'pointerdown'];

  const handleActivity = () => {
   resetTimer();
  };

  // ✅ attach listeners
  events.forEach((e) => window.addEventListener(e, handleActivity));

  resetTimer();

  return () => {
   // ✅ cleanup listeners
   events.forEach((e) => window.removeEventListener(e, handleActivity));
   clearAll();
  };
 }, [location.pathname]); // 👈 important

 return (
  <>
   {children}
   {showModal && <IdleModal seconds={seconds} onStay={resetTimer} />}
  </>
 );
}
