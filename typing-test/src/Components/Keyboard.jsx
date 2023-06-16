import { Button, Flex, } from '@chakra-ui/react';
import React from 'react';

const Keyboard = ({currKey}) => {
  const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l' ,';', 'Space']

  return  <Flex w='100%' flexWrap='wrap' justifyContent='center' alignItems='center' gap='10px' >
       {
        keys.map((ele)=>{
           return <Button _hover='none' bg={currKey === ele ? 'green' : 'teal'} color='white'  key={ele}>
               {ele}
           </Button>
        })
       }
  </Flex>
};

export default Keyboard;
