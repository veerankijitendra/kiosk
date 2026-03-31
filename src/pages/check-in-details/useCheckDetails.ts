import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { checkInDetailSchema } from '../../types/schema';
import type { CheckInDetailType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';
import { useDepartment } from '../../hooks/queries/useDepartment';

const useCheckDetails = () => {
  const navigate = useNavigate();
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
      ...{ age: '33', gender: 'Male', phone: '8080808080', name: 'jitendra' },
    },
    mode: 'onChange',
  });

  const { data } = useDepartment();
  console.log(data);

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = (data: CheckInDetailType) => {
    console.log(data);
    navigate('/' + ROUTES.PAYMENT);
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
