import './Login.css';
import { loginSchema } from '../../types/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type LoginFormType } from '../../types';
import KioskButton from '../../components/common/button';
import InputField from '../../components/common/input/Input';
import { useLogin } from '../../hooks/mutations/useLogin';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';
import { CloseEye, OpenEye } from '../../components/common/icons';
import { useState } from 'react';
import { navigateWithDirection } from '../../utils/commonFunctions';
import { useAuthStore } from '../../store/useAuthStore';
import { useKioskStore } from '../../store/useKioskStore';

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      kioskId: 'KIOSK-03',
      email: 'admin@anupama.com',
      password: '119911',
    },
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearSession = useKioskStore((state) => state.clearSession);

  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useLogin();

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormType) => {
    mutate(data, {
      onSuccess: (resposne) => {
        setAuth(resposne.data);
        clearSession();
        navigateWithDirection(navigate, ROUTES.WELCOME, 1);
      },
    });
  };

  const togglePassword = () => {
    setOpen((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <div className='login-form__container'>
        <header className='login-form__header'>
          <div className='login-form__title-row'>
            <h1>Kiosk Login</h1>
            {/* Subtle Pulse Icon */}
            <div className='login-header-pulse'>
              <svg viewBox='0 0 100 50' className='pulse-svg'>
                <path
                  className='pulse-path'
                  d='M0,25 L20,25 L25,15 L30,35 L35,25 L45,25 L50,5 L55,45 L60,25 L75,25 L80,20 L85,25 L100,25'
                  stroke='var(--color-primary)'
                  strokeWidth='3'
                  fill='none'
                />
              </svg>
            </div>
          </div>
          <p className='login-form__subtitle'>System Active • Secure Access Required</p>
        </header>

        {/* Rest of your InputFields... */}
        <InputField.Root error={errors.kioskId?.message}>
          <InputField.Label>Kiosk ID</InputField.Label>
          <InputField.Wrapper className='login-form__input-feild__wrapper'>
            <InputField.Input id='kioskId' {...register('kioskId')} placeholder='Ex: K-1092' />
          </InputField.Wrapper>
          <InputField.Error />
        </InputField.Root>

        <InputField.Root error={errors.password?.message}>
          <InputField.Label>Password</InputField.Label>
          <InputField.Wrapper className='login-form__input-feild__wrapper'>
            <InputField.Input
              id='password'
              type={open ? 'text' : 'password'}
              {...register('password')}
              placeholder='••••••••••••'
            />
            <InputField.LeadingIcon onClick={togglePassword} className='login-form__icon-wrapper'>
              {open ? <OpenEye /> : <CloseEye />}
            </InputField.LeadingIcon>
          </InputField.Wrapper>
          <InputField.Error />
        </InputField.Root>

        <KioskButton.Root
          type='submit'
          className='login-form__button'
          size='large'
          disabled={isSubmitting}
        >
          <KioskButton.Text>{isSubmitting ? 'Connecting...' : 'Login'}</KioskButton.Text>
        </KioskButton.Root>
      </div>
    </form>
  );
};

export default Login;
