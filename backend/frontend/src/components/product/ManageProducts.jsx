import {
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import clientApi from '../../api';
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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from '../../redux/actions/product';
import { useDispatch, useSelector } from 'react-redux';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  // const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState({});
  const [sortBy, setSortBy] = useState('asc');

  const [values, setValues] = useState({
    title: '',
    price: '',
  });

  const { title, price } = values;

  useEffect(() => {
    dispatch(getProducts(sortBy, []));
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteProduct(id));
    setTimeout(() => {
      dispatch(getProducts(sortBy, []));
    }, 3000);
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id == 'price') {
      setValues({ ...values, [id]: +value });
    } else {
      setValues({ ...values, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProduct(selected._id, values));
    setTimeout(() => {
      onClose();
      setValues({ title: '', price: '' });
      dispatch(getProducts(sortBy, []));
    }, 3000);
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
        <Link to='/product/new'>Create New Product</Link>
      </Flex>
      <Heading>Manage Products</Heading>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Sr.No</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Brand</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.map((cate, index) => (
                <Tr key={cate._id}>
                  <Td>{index + 1}</Td>
                  <Td>{cate.title}</Td>
                  <Td>{cate.price.toFixed(2)}</Td>
                  <Td>{cate.brand}</Td>
                  <Td display='flex' justifyContent='space-around'>
                    <Button
                      variant='solid'
                      colorScheme='messenger'
                      onClick={() => {
                        setSelected(cate);
                        onOpen();
                      }}
                    >
                      Update
                    </Button>

                    <Button
                      variant='solid'
                      colorScheme='orange'
                      onClick={() => {
                        handleDelete(cate._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product {selected.title} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id='new-note' onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Enter New Name</FormLabel>
                <Input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <FormLabel>Enter New Price</FormLabel>
                <Input
                  type='number'
                  id='price'
                  value={price}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
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

export default ManageProducts;
