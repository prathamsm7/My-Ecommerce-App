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
  Button,
  useDisclosure,
  Select,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrder } from '../redux/actions/order';
import { Skeleton } from '@chakra-ui/react';

const Orders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState({});
  const [status, setStatus] = useState('');

  const { orders } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateOrder(selected._id, { status: status }));
    setTimeout(() => {
      dispatch(fetchOrders());
    }, 2000);
    onClose();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      if (user.user?.user.role == 'user') {
        dispatch(fetchOrders(user.user.user._id));
      } else if (user.role == 'user') {
        dispatch(fetchOrders(user._id));
      } else {
        dispatch(fetchOrders());
      }
    }, 2000);
  }, [dispatch]);

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
                <Th>Order Status</Th>
                {user.role == 'admin' || user.user?.user.role == 'admin' ? (
                  <Th>Actions</Th>
                ) : null}
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
                      <Td>{data.totalItems}</Td>
                      <Td>{date.substring(0, 25)}</Td>
                      <Td>{data.status ? data.status : 'Not Available'}</Td>

                      {user.role == 'admin' ||
                      user.user?.user.role == 'admin' ? (
                        <Td>
                          <Button
                            variant='outline'
                            colorScheme='green'
                            onClick={() => {
                              setSelected(data);
                              onOpen();
                            }}
                            isDisabled={
                              data.status == 'Delivered' ? true : false
                            }
                          >
                            Update Status
                          </Button>
                        </Td>
                      ) : null}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Order Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id='new-note' onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Current Status</FormLabel>
                <Input
                  type='text'
                  id='title'
                  readOnly
                  defaultValue={selected.status}
                />
                <FormLabel>Enter New Status</FormLabel>
                <Select
                  id='status'
                  placeholder='Select Status'
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value='Dispatched'>Dispatched</option>
                  <option value='Delivered'>Delivered</option>
                </Select>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>

            <Button type='submit' form='new-note'>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Orders;
