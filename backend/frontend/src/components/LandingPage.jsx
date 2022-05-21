import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import img from '../images/team.svg';
import axios from 'axios';
import clientApi from '../api';

const LandingPage = () => {
  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    let data = await clientApi.get('/api/user/demo');
    console.log(data);
  };

  return (
    <Container
      maxW={['100%', '95%']}
      height={'90vh'}
      mt='60px'
      mb='40px'
      p='10px'
      bg='whitesmoke'
    >
      <SimpleGrid
        columns={[1, 2]}
        spacingX='40px'
        spacingY='20px'
        mt='10%'
        p='10px'
      >
        <Box height={['auto', '400px']}>
          <Text fontSize='4xl'>
            Welcome to <Text color='blue'>MobiShop</Text>
          </Text>
          <Text fontSize='xl'>Purchase your favourite products</Text>
          <Text color='gray.500' noOfLines={2}>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </Text>
          <Button variant='solid' colorScheme='facebook' mt='20px'>
            <Link to='/home'>View All Products</Link>
          </Button>
        </Box>
        <Box
          height='400px'
          backgroundImage={img}
          bgPosition='center'
          bgRepeat='no-repeat'
          bgSize='contain'
        />
      </SimpleGrid>
    </Container>
  );
};

export default LandingPage;
