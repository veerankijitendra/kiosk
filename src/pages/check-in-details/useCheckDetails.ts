import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { checkInDetailSchema } from '../../types/schema';
import type { CheckInDetailType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';
import { navigateWithDirection } from '../../utils/commonFunctions';
import { useKioskStore } from '../../store/useKioskStore';

const useCheckDetails = () => {
  const navigate = useNavigate();
  const patientDetails = useKioskStore((store) => store.currentPatient);
  const registerPatient = useKioskStore((store) => store.registerPatient);

  const {
    control,
    register,
    handleSubmit,
    resetField,
    setFocus,
    formState: { errors },
  } = useForm<CheckInDetailType>({
    resolver: zodResolver(checkInDetailSchema),
    defaultValues: {
      ...(patientDetails || {}),
    },
    mode: 'onChange',
  });

  const handleBack = () => {
    navigateWithDirection(navigate, '/' + ROUTES.DOCTORS, -1);
  };

  const handleConfirm = (data: CheckInDetailType) => {
    registerPatient(data);
    navigateWithDirection(navigate, '/' + ROUTES.PAYMENT, 1);
  };

  const handleClearPhone = () => {
    resetField('phone');
    setFocus('phone');
  };

  return {
    handleBack,
    handleConfirm,
    handleClearPhone,
    register,
    handleSubmit,
    errors,
    control,
  };
};

export default useCheckDetails;
