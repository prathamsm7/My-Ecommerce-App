import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeSelectedProducts } from '../redux/actions/product';
import { showProduct } from '../redux/actions/product';
import { addProductToCart } from '../redux/actions/cart';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';

const Details = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { product, loading } = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(false);

  const [itemQuantity, setItemQuantity] = useState(1);
  const handleQuantityChange = (itemQuantity) => setItemQuantity(itemQuantity);

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;
    // console.log(type, value);

    if (type === 'inc' && value < 10) {
      setItemQuantity(itemQuantity + 1);
      // dispatch(incrementCartQuantity(id));
    }

    if (type === 'desc' && value > 1) {
      setItemQuantity(itemQuantity - 1);
      // dispatch(decrementCartQuantity(id));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(showProduct(id));
    }

    return () => {
      dispatch(removeSelectedProducts());
    };
  }, []);

  return (
    <Container
      maxW={['100%', '95%']}
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      <ToastContainer />
      <SimpleGrid columns={[1, 2]} spacing='40px'>
        <Box
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}
        >
          {loading ? (
            <div>
              <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            </div>
          ) : product ? (
            <Flex justifyContent='center' p={2} as='article'>
              <Image
                h='350px'
                objectFit='fill'
                src={
                  typeof product.images == 'object'
                    ? `${product.images[0]}`
                    : `${product.images}`
                }
                // loading='lazy'
                alt='stock image'
              />
            </Flex>
          ) : null}
        </Box>
        <Box textAlign='left'>
          {loading ? (
            <div>
              <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            </div>
          ) : product ? (
            <>
              <Heading as='h2' size='md' mb='20px'>
                {product.title}
              </Heading>
              <Heading size='sm' color='red.500'>
                ₹{product.price?.toFixed(2)}
              </Heading>
              <Box mt='10px'>
                <Text fontSize='sm' fontWeight='bold'>
                  CPU
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.cpu}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Camera
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.camera}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Size
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.size}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Weight
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.weight}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Display
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.display}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Battery
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.battery}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Memory
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.memory}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Description
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {product.description}
                </Text>
              </Box>
              <Stack shouldWrapChildren direction='row'>
                <Text fontSize='sm' fontWeight='bold'>
                  Choose Quantity
                </Text>
                <Box
                  style={{ border: '2px solid #4f7ab1', borderRadius: '5px' }}
                >
                  <input
                    onClick={(e) => {
                      incrementOrDecrement(e, 'inc');
                    }}
                    type='button'
                    value='+'
                    className='plus'
                    style={{ padding: '2px' }}
                  />
                  <input
                    onChange={handleQuantityChange}
                    type='number'
                    step='1'
                    max='10'
                    min='1'
                    value={itemQuantity}
                    title='Qty'
                    className='qty'
                    size='4'
                  />
                  <input
                    onClick={(e) => {
                      incrementOrDecrement(e, 'desc');
                    }}
                    type='button'
                    value='-'
                    className='minus'
                    style={{ padding: '2px' }}
                  />
                </Box>
              </Stack>
              <Button
                colorScheme='pink'
                minWidth='120px'
                variant='solid'
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    dispatch(addProductToCart(product, itemQuantity));
                  }, 2000);
                }}
                mt='10px'
              >
                {isLoading ? `Adding...` : `Add to Cart`}
              </Button>
            </>
          ) : null}
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default Details;
