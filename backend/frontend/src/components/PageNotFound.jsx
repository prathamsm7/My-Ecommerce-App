import { Container, Image } from '@chakra-ui/react';
import React from 'react';

const PageNotFound = () => {
  return (
    <Container
      maxW='95%'
      mt='60px'
      mb='40px'
      p='10px'
      bg='aliceblue'
      color='#262626'
    >
      <Image
        src='https://media.istockphoto.com/vectors/page-not-found-banner-template-vector-id1311367104?k=20&m=1311367104&s=612x612&w=0&h=xwkALhDaxMN_u3nur9DrkXoXXfXVRqFAwiV878CYiTM='
        loading='lazy'
        objectFit='fill'
        width='100%'
      />
    </Container>
  );
};

export default PageNotFound;
