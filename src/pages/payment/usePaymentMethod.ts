import { useState } from 'react';
import { useCreateToken } from '../../hooks/mutations/useCreateToken';
import type { CreateTokenPayload, PaymentMethodType } from '../../types';
import { useNavigate } from 'react-router-dom';

const usePaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const { mutate, isPending } = useCreateToken();
  const navigate = useNavigate();
  // const patientDetails = useAppSelector((state) => state.token.patientDetails);
  // const dispatch = useAppDispatch();

  const handleContinue = async () => {
    if (!selectedMethod) return;
    // if (!patientDetails) return;
    if (isPending) return;
    const payloadUPI: CreateTokenPayload = {
      departmentId: 'dept_002',
      doctorId: 'doc_456',
      appointmentDate: '2026-04-01T14:00:00Z',
      paymentType: 'UPI',
      patientDetails: {
        name: 'Sita Devi',
        age: '28',
        phone: '9123456780',
        gender: 'Female',
      },
    };
    const payload: CreateTokenPayload = {
      departmentId: 'dept_001',
      doctorId: 'doc_123',
      appointmentDate: '2026-03-31T10:30:00Z',
      paymentType: 'CASH',
      patientDetails: {
        name: 'Ravi Kumar',
        age: '32',
        phone: '9876543210',
        gender: 'Male',
      },
    };

    mutate({ ...payloadUPI, ...payload });
  };

  const handleMethodSelect = (methodId: PaymentMethodType) => {
    setSelectedMethod(methodId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return {
    handleContinue,
    handleMethodSelect,
    selectedMethod,
    handleBack,
    isPending,
  };
};

export default usePaymentMethod;
