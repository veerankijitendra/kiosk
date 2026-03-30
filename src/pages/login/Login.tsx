import './Login.css';
import { loginSchema } from '../../types/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type LoginFormType } from '../../types';
import KioskButton from '../../components/common/button';
import InputField from '../../components/common/input/Input';
import { useLogin } from '../../hooks/mutations/useLogin';

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      kioskId: '123456',
      password: 'jdfkjdjksf',
    },
  });

  const { mutate } = useLogin();

  const onSubmit = (data: LoginFormType) => {
    mutate(data, {
      onSuccess: (resposne) => {
        console.log('jtiendra===>', resposne);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      {/* Kiosk ID */}
      <h1>Kiosk Login</h1>
      <InputField.Root>
        <InputField.Label>Kiosk ID</InputField.Label>
        <InputField.Wrapper>
          <InputField.Input id='kioskId' {...register('kioskId')} placeholder='Enter kiosk ID' />
        </InputField.Wrapper>
        {errors.kioskId && <InputField.Error>{errors.kioskId.message}</InputField.Error>}
      </InputField.Root>

      {/* Password */}
      <InputField.Root>
        <InputField.Label>Password</InputField.Label>
        <InputField.Wrapper>
          <InputField.Input
            id='password'
            type='password'
            {...register('password')}
            placeholder='Enter kiosk password'
          />
        </InputField.Wrapper>
        {errors.password && <InputField.Error>{errors.password.message}</InputField.Error>}
      </InputField.Root>

      {/* Submit */}
      <KioskButton.Root type='submit' disabled={isSubmitting}>
        <KioskButton.Text>Login</KioskButton.Text>
      </KioskButton.Root>
    </form>
  );
};

export default Login;
