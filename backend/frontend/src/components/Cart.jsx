import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import {
  removeProductToCart,
  incrementCartQuantity,
  decrementCartQuantity,
} from '../redux/actions/cart';

const Cart = ({ title, images, price, cpu, camera, size, _id, quantity }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const handleQuantityChange = (itemQuantity) => setItemQuantity(itemQuantity);

  const dispatch = useDispatch();

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;
    console.log(type, value);

    if (type === 'inc' && value < 10) {
      setItemQuantity(itemQuantity + 1);
      dispatch(incrementCartQuantity(_id));
    }

    if (type === 'desc' && value > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(decrementCartQuantity(_id));
    }
  };

  return (
    <>
      <ToastContainer />

      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns={['repeat(1, 12fr)', 'repeat(5, 1fr)']}
        gap={4}
      >
        {_id ? (
          <>
            <GridItem
              rowSpan={2}
              colSpan={[4, 2]}
              display='flex'
              justifyContent='space-evenly'
              padding='10px'
              style={{
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
              }}
            >
              <Image
                src={typeof images == 'object' ? `${images[0]}` : `${images}`}
                objectFit='cover'
                height='250px'
              />
            </GridItem>
            <GridItem
              colSpan={[4, 3]}
              rowSpan={2}
              textAlign='left'
              padding='10px'
              style={{
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
              }}
            >
              <Heading as='h2' size='lg' mb='20px' color='rebeccapurple'>
                {title}
              </Heading>
              <Heading size='md' as='h1' color='red.500'>
                ₹{price.toFixed(2)}
              </Heading>
              <Box mt='10px'>
                <Text fontSize='sm' fontWeight='bold'>
                  CPU
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {cpu}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Camera
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {camera}
                </Text>
                <Text fontSize='sm' fontWeight='bold'>
                  Size
                </Text>
                <Text fontSize='sm' fontWeight='semibold'>
                  {size}
                </Text>
                <Stack shouldWrapChildren direction='row'>
                  <Text fontSize='sm' fontWeight='bold'>
                    Choose Quantity
                  </Text>
                  <Box>
                    <input
                      onClick={(e) => {
                        incrementOrDecrement(e, 'inc');
                      }}
                      type='button'
                      value='+'
                      style={{ padding: '0 2px' }}
                    />
                    <input
                      onChange={handleQuantityChange}
                      type='number'
                      step='1'
                      max='10'
                      min='1'
                      value={itemQuantity}
                      title='Qty'
                      size='4'
                    />
                    <input
                      onClick={(e) => {
                        incrementOrDecrement(e, 'desc');
                      }}
                      type='button'
                      value='-'
                      style={{ padding: '0 2px' }}
                    />
                  </Box>
                </Stack>
              </Box>
              <VStack>
                <Button
                  colorScheme='red'
                  variant='solid'
                  mt='10px'
                  onClick={() => {
                    setTimeout(() => {
                      dispatch(removeProductToCart(_id));
                    });
                    toast.info('Item Removed From Cart.');
                  }}
                >
                  Remove From Cart
                </Button>
              </VStack>
            </GridItem>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default Cart;
