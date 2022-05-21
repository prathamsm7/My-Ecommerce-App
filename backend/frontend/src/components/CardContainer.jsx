import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Cart';

const CardContainer = () => {
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  let cartTotal = 0;
  let cartItems = 0;
  cart.map((item) => {
    let p = item.price.toFixed(2);
    let q = item.quantity;
    cartTotal += p * q;
    cartItems += q;
  });

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/checkout');
    }, 3000);
  };

  const startLoading = () => {};

  return (
    <Container
      maxW={['100%', '95%']}
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      {cart && cart.length > 0 ? (
        <Stack
          direction={['column', 'row']}
          align='stretch'
          mb='10px'
          bg='#1a1a69'
          fontWeight='bold'
          textAlign='center'
          color='yellow.400'
          justifyContent='center'
          alignItems='center'
          position='sticky'
          top='60px'
          zIndex={1}
        >
          <Box w='100%' h={['auto', '40px']}>
            Cart Items {cartItems}
          </Box>
          <Box w='100%' h={['auto', '40px']}>
            Cart Total {cartTotal.toFixed(2)}
          </Box>
        </Stack>
      ) : null}

      {cart && cart.length > 0 ? (
        <>
          <VStack spacing={4} align='stretch'>
            {cart.map((item) => {
              // console.log('cart item', item);
              return <Card key={item._id} {...item} img={item.images[0]} />;
            })}
          </VStack>
          {!isLoading ? (
            <Button
              colorScheme='telegram'
              variant='solid'
              mt='10px'
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              colorScheme='telegram'
              variant='solid'
              mt='10px'
              isLoading
              loadingText='Processing'
            >
              Processing
            </Button>
          )}
        </>
      ) : (
        <>
          <Heading as='h2' size='lg' mb='20px' color='rebeccapurple'>
            Your Cart Is Empty
          </Heading>
        </>
      )}
    </Container>
  );
};

export default CardContainer;
