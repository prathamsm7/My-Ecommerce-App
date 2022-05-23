import React, { useEffect } from 'react';
import { Container, FormHelperText, Heading } from '@chakra-ui/react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import clientApi from '../../api';
import { signupUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, isReg } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    dispatch(signupUser(values));
  }

  useEffect(() => {
    if (isReg) {
      navigate('/signin');
    }
  }, [dispatch, loading, error, isReg]);

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
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.firstName} isRequired>
          <FormLabel htmlFor='firstName'>First name</FormLabel>
          <Input
            id='firstName'
            placeholder='firstName'
            {...register('firstName', {
              required: 'First Name is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.lastName} isRequired>
          <FormLabel htmlFor='lastName'>Last name</FormLabel>
          <Input
            id='lastName'
            placeholder='lastName'
            {...register('lastName', {
              required: 'Last Name is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>

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
      <span>
        Already Have an account ?{' '}
        <Link to='/signin' style={{ color: 'blue' }}>
          Signin Here
        </Link>
      </span>
    </Container>
  );
};

export default SignUp;
