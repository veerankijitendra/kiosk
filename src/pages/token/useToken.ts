// import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { useKioskStore } from '../../store/useKioskStore';

const useTokenGenerated = () => {
  const [countdown, setCountdown] = useState(15);
  // const {
  //   selectedDepartment,
  //   selectedDoctor,
  //   generatedToken,
  //   patientDetails: { name, age, phone, weight },
  // } = useAppSelector((state) => state.token);
  const department = useKioskStore((store) => store.department);
  const doctor = useKioskStore((store) => store.doctor);
  const generatedToken = useKioskStore((store) => store.token);
  const { age, gender, name, phone } = useKioskStore((store) => store.currentPatient);

  const selectedDepartment = department?.name;
  const selectedDoctor = doctor?.name;

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
    gender,
    selectedDepartment,
    selectedDoctor,
    generatedToken,
  };
};

export default useTokenGenerated;
