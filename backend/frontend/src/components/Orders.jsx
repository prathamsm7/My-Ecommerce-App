import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/order';
import { Skeleton } from '@chakra-ui/react';

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // console.log('order', user.user.user.role);
      if (user.user?.user.role == 'user') {
        dispatch(fetchOrders(user.user.user._id));
      } else if (user.role == 'user') {
        dispatch(fetchOrders(user._id));
      } else {
        dispatch(fetchOrders());
      }
    }, 2000);
  }, []);

  console.log(orders);
  return (
    <Container
      maxW={['100%', '95%']}
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      <Heading as='h3'>Orders Details</Heading>
      {!orders || typeof orders == 'string' || isLoading ? (
        <div>
          <Heading as='h6' fontSize='md' color='red.300'>
            You dont have placed any order yet !
          </Heading>
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        </div>
      ) : (
        <TableContainer overflowX='auto' overflowY='auto' height='500px'>
          <Table
            variant='simple'
            colorScheme='teal'
            border='2px'
            borderColor='gray'
            rounded
          >
            <Thead bgColor='lightgray'>
              <Tr>
                <Th>Sr.No</Th>
                <Th display={['none', 'block']}>Order Id</Th>
                <Th>Total Amount</Th>
                <Th>Total Items</Th>
                <Th>Order Date</Th>
              </Tr>
            </Thead>

            <Tbody>
              {orders &&
                orders.map((data, index) => {
                  let date = new Date(data.createdAt).toString();
                  return (
                    <Tr key={data._id}>
                      <Td>{index + 1}</Td>
                      <Td display={['none', 'block']}>{data.transactionId}</Td>
                      <Td>{data.total.toFixed(2)}</Td>
                      <Th>{data.totalItems}</Th>
                      <Th>{date.substring(0, 25)}</Th>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Orders;
