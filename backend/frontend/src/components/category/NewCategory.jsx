import { Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import clientApi from '../../api';
import { newCategory } from '../../redux/actions/category';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, category } = useSelector(
    (state) => state.newCategory
  );

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    setTimeout(async () => {
      dispatch(newCategory(values));
      !loading && !error ? navigate('/category') : null;
    }, 3000);
  }

  return (
    <Container
      maxW={['100%', '95%']}
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      <Flex justifyContent='flex-end' color='red'>
        <Link to='/category'>View All Categories</Link>
      </Flex>
      <Heading>Add New Category </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.category}>
          <FormLabel htmlFor='email'>Category Name</FormLabel>
          <Input
            id='category'
            placeholder='category'
            {...register('name', {
              required: 'Category is required',
              minLength: { value: 5, message: 'Minimum length should be 5' },
            })}
          />
          <FormErrorMessage>
            {errors.category && errors.category.message}
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

export default NewCategory;
