import React, { useEffect } from 'react';
import { Box, Container, FormHelperText, Heading } from '@chakra-ui/react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import clientApi from '../../api';
import { loginUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, error, user, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    // setTimeout(async () => {
    dispatch(loginUser(values));
    // }, 3000);
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/cart');
    }
  }, [dispatch, error, isAuth]);

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
      <Heading>Sign In</Heading>
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
        <FormControl isInvalid={errors.password} isRequired>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type='password'
            id='password'
            placeholder='Password'
            {...register('password', {
              required: 'password is required',
              minLength: { value: 8, message: 'Minimum length should be 8' },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
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
      <Box>
        <Link to='/forgot-password' style={{ color: 'blue' }}>
          Forgot Password
        </Link>
      </Box>
      <span>
        Don't Have an account ?{' '}
        <Link to='/signup' style={{ color: 'blue' }}>
          Signup Here
        </Link>
      </span>
    </Container>
  );
};

export default SignIn;
