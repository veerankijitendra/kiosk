// import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

const useTokenGenerated = () => {
  const [countdown, setCountdown] = useState(15);
  // const {
  //   selectedDepartment,
  //   selectedDoctor,
  //   generatedToken,
  //   patientDetails: { name, age, phone, weight },
  // } = useAppSelector((state) => state.token);

  const name = 'Jitendra';
  const age = '19';
  const phone = '8080808082';
  const weight = 'add';
  const selectedDepartment = 'add';
  const selectedDoctor = 'add';
  const generatedToken = 'add';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          //   onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrint = () => {
    // Implement print functionality
    console.log('Printing token...');
    window.print();
  };

  return {
    handlePrint,
    countdown,
    name,
    age,
    phone,
    weight,
    selectedDepartment,
    selectedDoctor,
    generatedToken,
  };
};

export default useTokenGenerated;
