import { useState } from 'react';
import { useCreateToken } from '../../hooks/mutations/useCreateToken';
import type { CreateTokenPayload, PaymentMethodType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { navigateWithDirection } from '../../utils/commonFunctions';
import { ROUTES } from '../../utils/routeConstants';
import { useKioskStore } from '../../store/useKioskStore';

const usePaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const { mutate, isPending } = useCreateToken();
  const navigate = useNavigate();
  const setPaymentMethod = useKioskStore((state) => state.setPaymentMethod);
  const department = useKioskStore((store) => store.department);
  const doctor = useKioskStore((store) => store.doctor);
  const patientDetails = useKioskStore((store) => store.currentPatient);
  // const patientDetails = useAppSelector((state) => state.token.patientDetails);
  // const dispatch = useAppDispatch();

  const handleContinue = async () => {
    if (!selectedMethod) return;
    // if (!patientDetails) return;
    if (isPending) return;

    const payload: CreateTokenPayload = {
      departmentId: department?._id || '',
      doctorId: doctor?._id || '',
      appointmentDate: new Date().toISOString().split('T')[0],
      paymentType: selectedMethod,
      patientDetails,
    };

    mutate(payload);
  };

  const handleMethodSelect = (methodId: PaymentMethodType) => {
    setSelectedMethod(methodId);
    setPaymentMethod(methodId);
  };

  const handleBack = () => {
    navigateWithDirection(navigate, '/' + ROUTES.CHECK_IN_DETAILS, -1);
  };

  return {
    handleContinue,
    handleMethodSelect,
    selectedMethod,
    handleBack,
    isPending,
    department,
    doctor,
  };
};

export default usePaymentMethod;
