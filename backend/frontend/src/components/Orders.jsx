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
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      dispatch(fetchOrders());
    }, 2000);
  }, []);

  // console.log(tData.data);
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
      {!orders || isLoading ? (
        <div>
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
                <Th>Order Id</Th>
                <Th>Total Amount</Th>
                <Th>Total Items</Th>
                <Th>Order Date</Th>
              </Tr>
            </Thead>

            <Tbody>
              {orders &&
                orders.map((data, index) => {
                  // let items = data.items;
                  // let q = 0;
                  // for (let i = 0; i < items.length; i++) {
                  //   q += items[i].quantity;
                  // }
                  return (
                    <Tr key={data._id}>
                      <Td>{index + 1}</Td>
                      <Td>{data.transactionId}</Td>
                      <Td>{data.total.toFixed(2)}</Td>
                      <Th>{data.totalItems}</Th>
                      <Th>{Date(data.createdAt).substring(0, 25)}</Th>
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
