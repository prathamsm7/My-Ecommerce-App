import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/category';
import clientApi from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { createProduct } from '../../redux/actions/product';

const NewProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.categories);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [values, setValues] = useState({
    title: '',
    category: '',
    images: '',
    brand: '',
    price: '',
    cpu: '',
    camera: '',
    size: '',
    weight: '',
    display: '',
    battery: '',
    memory: '',
    description: '',
  });

  const {
    title,
    category,
    images,
    brand,
    price,
    cpu,
    camera,
    size,
    weight,
    display,
    battery,
    memory,
    description,
  } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProduct(values));
    navigate('/product/manage');
  };

  const onChangeInput = (e) => {
    let { id, value } = e.target;
    if (id == 'price') {
      setValues({ ...values, [id]: +value });
    } else {
      setValues({ ...values, [id]: value });
    }
  };

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
        <Link to='/product/manage'>Manage Products</Link>
      </Flex>
      <Heading>Create new product</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input
            id='title'
            type='text'
            value={title}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Select
            id='category'
            placeholder='Select Category'
            onChange={(e) => onChangeInput(e)}
          >
            {categories.map((cate) => {
              return (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
          </Select>
          <FormLabel htmlFor='images'>Image</FormLabel>
          <Input
            id='images'
            type='text'
            value={images}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='brand'>Brand</FormLabel>
          <Input
            id='brand'
            type='text'
            value={brand}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='price'>Price</FormLabel>
          <Input
            id='price'
            type='number'
            value={price}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='cpu'>CPU</FormLabel>
          <Input
            id='cpu'
            type='text'
            value={cpu}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='camera'>Camera</FormLabel>
          <Input
            id='camera'
            type='text'
            value={camera}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='size'>Size</FormLabel>
          <Input
            id='size'
            type='text'
            value={size}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='weight'>Weight</FormLabel>
          <Input
            id='weight'
            type='text'
            value={weight}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='display'>Display</FormLabel>
          <Input
            id='display'
            type='text'
            value={display}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='memory'>Memory</FormLabel>
          <Input
            id='memory'
            type='text'
            value={memory}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='battery'>Battery</FormLabel>
          <Input
            id='battery'
            type='text'
            value={battery}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Input
            id='description'
            type='text'
            value={description}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme='teal'
          type='submit'
          //   onClick={() => console.log(values)}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewProduct;
