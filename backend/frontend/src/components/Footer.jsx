import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex
      bg='blue.900'
      w='100%'
      position='fixed'
      bottom='0'
      m='auto'
      justifyContent='center'
      color='#8eecf5'
    >
      <Text fontWeight='semibold'>Mobishop @Copyright 2022-2023</Text>
    </Flex>
  );
};

export default Footer;
