import './Login.css';
import { loginSchema } from '../../types/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type LoginFormType } from '../../types';
import KioskButton from '../../components/common/button';
import InputField from '../../components/common/input/Input';
import { useLogin } from '../../hooks/mutations/useLogin';
import { notify } from '../../lib/toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';
import { setTokens } from '../../utils/auth';
import { CloseEye, OpenEye } from '../../components/common/icons';
import { useState } from 'react';
import { useDoctors } from '../../hooks/queries/useDoctors';

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      kioskId: '',
      email: 'admin@anupama.com',
      password: 'password123',
    },
  });

  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useLogin();

  const navigate = useNavigate();

  const data = useDoctors({});
  console.log('jitendra===>', data);

  const onSubmit = (data: LoginFormType) => {
    mutate(data, {
      onSuccess: (resposne) => {
        setTokens(resposne.data?.token, resposne.data?.token);
        navigate(ROUTES.WELCOME);
      },
      onError: (error) => {
        console.error(error);
        notify.error((error as { message: string })?.message as string);
      },
    });
  };

  const togglePassword = () => {
    setOpen((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      {/* Kiosk ID */}
      <div className='login-form__container'>
        <h1 className=''>Kiosk Login</h1>
        <InputField.Root error={errors.kioskId?.message}>
          <InputField.Label>Kiosk ID</InputField.Label>
          <InputField.Wrapper className='login-form__input-feild__wrapper'>
            <InputField.Input id='kioskId' {...register('kioskId')} placeholder='Enter kiosk ID' />
          </InputField.Wrapper>
          {errors.kioskId && <InputField.Error>{errors.kioskId.message}</InputField.Error>}
        </InputField.Root>

        {/* Password */}
        <InputField.Root error={errors.password?.message}>
          <InputField.Label>Password</InputField.Label>
          <InputField.Wrapper className='login-form__input-feild__wrapper'>
            <InputField.Input
              id='password'
              type={open ? 'text' : 'password'}
              {...register('password')}
              placeholder='Enter kiosk password'
            />

            <InputField.LeadingIcon onClick={togglePassword} className='login-form__icon-wrapper'>
              {open ? <OpenEye /> : <CloseEye />}
            </InputField.LeadingIcon>
          </InputField.Wrapper>
          {errors.password && <InputField.Error>{errors.password.message}</InputField.Error>}
        </InputField.Root>

        {/* Submit */}
        <KioskButton.Root
          type='submit'
          className='login-form__button'
          size='large'
          disabled={isSubmitting}
        >
          <KioskButton.Text>Login</KioskButton.Text>
        </KioskButton.Root>
      </div>
    </form>
  );
};

export default Login;
