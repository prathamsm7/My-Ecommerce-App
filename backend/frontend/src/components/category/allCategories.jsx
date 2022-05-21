import {
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from '../../redux/actions/category';
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
import { Link } from 'react-router-dom';

const allCategories = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.categories);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getCategories());
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
      <Flex justifyContent='flex-end' color='red'>
        <Link to='/category/new'>Create New Category</Link>
      </Flex>
      <Heading>Manage Categories</Heading>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((cate) => (
              <Tr key={cate._id}>
                <Td>{cate._id}</Td>
                <Td>{cate.name}</Td>
                <Td display='flex' justifyContent='space-around'>
                  <Button
                    variant='solid'
                    colorScheme='messenger'
                    onClick={() => {
                      setId(cate._id);
                      onOpen(cate);
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    variant='solid'
                    colorScheme='orange'
                    onClick={() => {
                      dispatch(deleteCategory(cate._id));
                      setTimeout(() => {
                        dispatch(getCategories());
                      }, 2000);
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
          <ModalHeader>Update Category </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id='new-note'
              onSubmit={(event) => {
                event.preventDefault();
                dispatch(updateCategory(id, { name: name }));
                setTimeout(() => {
                  dispatch(getCategories());
                  onClose();
                  setName('');
                  setId('');
                }, 2000);
              }}
            >
              <FormControl>
                <FormLabel>Enter New Name</FormLabel>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {loading ? (
              <Button type='submit' form='new-note' isLoading>
                Submit
              </Button>
            ) : (
              <Button type='submit' form='new-note'>
                Submit
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default allCategories;
