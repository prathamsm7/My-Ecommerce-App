import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions/cart';
import axios from 'axios';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === 'localhost';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    name: '',
    address1: '',
    address2: '',
    pin: '',
  });

  const { name, address1, address2, pin } = details;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setDetails({ ...details, [name]: value });
  };

  let cartTotal = 0;
  let cartItems = 0;
  cart.map((item) => {
    let p = item.price.toFixed(2);
    let q = item.quantity;
    cartTotal += p * q;
    cartItems += q;
  });

  // ! payment gateway

  let cartProducts = cart.map((prod) => {
    return { product: prod._id, quantity: prod.quantity };
  });

  // ? Payment Section
  async function displayRazorpay(e) {
    e.preventDefault();
    setIsLoading(!isLoading);
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    } else {
      const payData = {
        payment_capture: 1,
        amount: cartTotal.toFixed(2),
        currency: 'INR',
      };
      const data = await fetch(
        `https://my-mern-ecommerce-app.herokuapp.com/api/payment/pay`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payData),
        }
      ).then((t) => t.json());
      const options = {
        // key: __DEV__ ? "rzp_test_LrUd2sYQ0QeGXG" : "PRODUCTION_KEY",
        key: __DEV__ ? 'rzp_test_LrUd2sYQ0QeGXG' : 'rzp_test_LrUd2sYQ0QeGXG',
        currency: data.currency,
        amount: data.amount * 100,
        order_id: data.id,
        name: 'MobiShop',
        description: 'Thank you for nothing. Please give us some money',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJbfD1Dwsc-sE12mJTihnt4XctsUayg8g2w&usqp=CAU',
        handler: async function (response) {
          const Orderdata = {
            orderCreationId: data.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const order = {
            user: user._id || user.user._id,
            transactionId: Orderdata.razorpayOrderId,
            orderedProducts: [...cartProducts],
            shippingInfo: {
              address1: address1,
              address2: address2,
              pin: parseInt(pin),
            },
            total: cartTotal,
            totalItems: cartItems,
          };

          const result = await axios
            .post(`https://my-mern-ecommerce-app.herokuapp.com/api/payment`, {
              order,
              Orderdata,
            })
            .then((res) => {
              setTimeout(() => {
                dispatch(clearCart());
                navigate('/orders');
              }, 4000);
              setIsLoading(!isLoading);
            })
            .catch((err) => {
              navigate('/cart');
              console.log(err);
            });
        },
        prefill: {
          name: user?.firstName || user?.user.firstName,
          email: user?.email || user?.user.email,
          phone_number: '9899999999',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }

  return (
    <Container
      maxW={['100%', '95%']}
      mt='60px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      <SimpleGrid columns={['1', '2']} spacing={10}>
        <form
          style={{
            border: '2px sold gray',
            padding: '10px',
            borderRadius: '10px',
          }}
          onSubmit={(e) => displayRazorpay(e)}
        >
          <FormControl isRequired>
            <FormLabel htmlFor='full-name'>First name</FormLabel>
            <Input
              name='name'
              value={details.name}
              id='full-name'
              placeholder='First name'
              variant='outline'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <FormLabel htmlFor='address-line-1'>Address Line 1</FormLabel>
            <Input
              name='address1'
              value={details.address1}
              id='address-line-1'
              placeholder='Address Line 1'
              variant='outline'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <FormLabel htmlFor='address-line-2'>Address Line 2</FormLabel>
            <Input
              name='address2'
              value={details.address2}
              id='address-line-2'
              placeholder='Address Line 2'
              variant='outline'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <FormLabel htmlFor='pine-code'>PIN Code</FormLabel>
            <Input
              name='pin'
              value={details.pin}
              id='pine-code'
              type='number'
              placeholder='PIN Code'
              variant='outline'
              maxLength={6}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {isLoading ? (
              <Button
                colorScheme='telegram'
                variant='solid'
                mt='3px'
                isLoading
                loadingText='Processing'
              >
                Processing
              </Button>
            ) : (
              <Button
                mt='3'
                type='submit'
                colorScheme='twitter'
                variant='solid'
                // onClick={displayRazorpay}
                // id='checkout-button-price_1KycwkSG2MWDo0XC34NB0O5F'
              >
                Proceed To Payment
              </Button>
            )}
          </FormControl>
        </form>
        <VStack boxShadow='md' p='6' rounded='md' bg='white'>
          <Box w='100%' p='3' border='1px' borderRadius='gray.200' rounded='md'>
            <Text fontSize='md' fontWeight='bold'>
              Total items in Cart {cartItems}
            </Text>
          </Box>
          <Box w='100%' p='3' border='1px' borderRadius='gray.200' rounded='md'>
            <Text fontSize='md' fontWeight='bold'>
              Cart Total ₹ {cartTotal.toFixed(2)}
            </Text>
          </Box>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default CheckoutPage;
