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
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { forgotPassword } from '../../redux/actions/user';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.forgotPassword);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    // console.log(values);
    setTimeout(async () => {
      dispatch(forgotPassword(values));
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
      <Heading>Forgot Password</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} isRequired>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            id='email'
            placeholder='email'
            {...register('email', {
              required: 'Email is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
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

export default ForgotPassword;
