import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  VStack,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Select,
  ScaleFade,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import { AllProducts } from '../redux/actions';
import { getProducts, removeSelectedProducts } from '../redux/actions/product';

const Home = () => {
  const products = useSelector((state) => state.products.products);
  const [isLoading, setIsLoading] = useState(true);

  const [checked, setChecked] = React.useState([]);
  const checkList = [
    'apple',
    'huawei',
    'meizu',
    'samsung',
    'vestel',
    'xiaomi',
    'asus',
    'vivo',
    'moto',
    'realme',
  ];

  const [sortBy, setSortBy] = useState('asc');

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  let filterArr = [];
  const applyFilter = async () => {
    checked.map((val) => {
      if (filterArr.length > 0) {
        filterArr = [filterArr + `&brands=${val}`];
      } else {
        filterArr.push(`brands=${val}`);
      }
    });

    dispatch(getProducts(sortBy, filterArr));
  };

  useEffect(() => {
    dispatch(removeSelectedProducts());
    setTimeout(() => {
      setIsLoading(false);

      dispatch(getProducts(sortBy, filterArr));
    }, 2000);
  }, [sortBy]);

  return (
    <Container
      maxW={['100%', '95%']}
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      {!products || isLoading ? (
        <div>
          <SkeletonCircle size='20' m='auto' />

          <Skeleton
            speed='2.0'
            colorstart='gray'
            colorend='black'
            height='40px'
            my='10px'
          />
          <Skeleton
            speed='2.0'
            colorstart='black'
            colorend='gray'
            height='40px'
            my='10px'
          />
          <Skeleton
            speed='2.0'
            colorstart='gray'
            colorend='black'
            height='40px'
            my='10px'
          />
          <Skeleton
            speed='2.0'
            colorstart='black'
            colorend='gray'
            height='40px'
            my='10px'
          />
        </div>
      ) : (
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(5, 1fr)']}
          gap={'10px'}
        >
          <GridItem
            colSpan={1}
            bg='#dedadadf'
            height='100vh'
            display={['none', 'block']}
            fontWeight='500'
          >
            <Box padding={'10px'}>
              <Text fontWeight='bold' textAlign='left'>
                Sort By Price
              </Text>
              <RadioGroup mt='20px'>
                <Stack>
                  <Radio
                    value='1'
                    onChange={() => {
                      setSortBy('asc');
                      // console.log(sortBy);
                    }}
                  >
                    Low-to-High
                  </Radio>
                  <Radio
                    value='2'
                    onChange={() => {
                      setSortBy('desc');
                      // console.log(sortBy);
                    }}
                  >
                    Hign-to-Low
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box padding={'10px'}>
              <Text fontWeight='bold' textAlign='left'>
                Filters By Brand
              </Text>
              <Button
                isDisabled={checked.length == 0 ? true : false}
                colorScheme='pink'
                size='sm'
                variant='solid'
                m={['10px']}
                onClick={applyFilter}
              >
                Apply Filter
              </Button>
              <VStack
                spacing={4}
                align='stretch'
                display={'flex'}
                alignItems='flex-start'
              >
                <CheckboxGroup>
                  {checkList.map((item, index) => {
                    return (
                      <Box key={index}>
                        <input
                          id={index + 1}
                          value={item}
                          type='checkbox'
                          onChange={handleCheck}
                        />
                        <span
                          className={isChecked(item)}
                          style={{ marginLeft: '3px' }}
                        >
                          {item.toUpperCase()}
                        </span>
                      </Box>
                    );
                  })}
                </CheckboxGroup>
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={4}>
            <SimpleGrid columns={[1, 2, 3]} spacing='10px' m={'auto'}>
              {products &&
                products.map((prod) => {
                  return (
                    <Box
                      id='pCard'
                      key={prod._id}
                      p='5px'
                      bg='aliceblue'
                      rounded={'10px'}
                      cursor='pointer'
                      style={{
                        boxShadow:
                          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                      }}
                      onClick={() => {
                        handleClick(prod._id);
                      }}
                    >
                      <Image
                        h='150px'
                        objectFit='cover'
                        src={
                          typeof prod.images == 'object'
                            ? `${prod.images[0]}`
                            : prod.images
                        }
                        alt='Dan Abramov'
                        m={'auto'}
                        loading='lazy'
                      />
                      <Text fontSize='md' fontWeight='bold' color='tomato'>
                        {prod.title}
                      </Text>
                      <Text fontSize='2xl' fontWeight='bold'>
                        ₹{prod.price.toFixed(2)}
                      </Text>
                      <Text fontSize='sm' noOfLines={[1, 2, 3]}>
                        {prod.description}
                      </Text>
                    </Box>
                  );
                })}
            </SimpleGrid>
          </GridItem>
        </Grid>
      )}
    </Container>
  );
};

export default Home;
