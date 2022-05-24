import React, { useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { resetPassword } from '../../redux/actions/user';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.forgotPassword);
  let param = useParams();
  let navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    // console.log({ newPassword: values.newPassword, resetLink: param.token });
    setTimeout(async () => {
      dispatch(
        resetPassword({
          newPassword: values.newPassword,
          resetLink: param.token,
        })
      );
      !loading ? navigate('/signin') : null;
    }, 3000);
  }

  return (
    <Container
      maxW={['100%', '70%']}
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      <ToastContainer />
      <Heading>Reset Password</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.newPassword} isRequired>
          <FormLabel htmlFor='newPassword'>Password</FormLabel>
          <Input
            id='newPassword'
            type='password'
            placeholder='password'
            {...register('newPassword', {
              required: 'Email is required',
              minLength: { value: 8, message: 'Minimum length should be 8' },
            })}
          />
          <FormErrorMessage>
            {errors.newPassword && errors.newPassword.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
