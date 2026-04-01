// import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { useKioskStore } from '../../store/useKioskStore';
import { useNavigate } from 'react-router-dom';
import { navigateWithDirection } from '../../utils/commonFunctions';
import { ROUTES } from '../../utils/routeConstants';

const useTokenGenerated = () => {
  const [countdown, setCountdown] = useState(15);
  const department = useKioskStore((store) => store.department);
  const doctor = useKioskStore((store) => store.doctor);
  const generatedToken = useKioskStore((store) => store.token);
  const { age, gender, name, phone } = useKioskStore((store) => store.currentPatient);
  const clearSession = useKioskStore((store) => store.clearSession);
  const navigate = useNavigate();

  const selectedDepartment = department?.name;
  const selectedDoctor = doctor?.name;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearSession();
          navigateWithDirection(navigate, '/' + ROUTES.WELCOME, -1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrint = () => {
    // Implement print functionality
    window.print();
  };

  return {
    handlePrint,
    countdown,
    name,
    age,
    phone,
    gender,
    selectedDepartment,
    selectedDoctor,
    generatedToken,
  };
};

export default useTokenGenerated;
