import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const Random = () => {
  const { presentText , typedText} = useSelector((store) => store.AppReducer);

  const renderText = () => {
    const typedChars = typedText.split('');
    const correctChars = presentText.split('');

    return correctChars.map((char, index) => {
      const isCorrect = typedChars[index] === char;
      const color = isCorrect ? 'green' : 'red';

      return (
        <span style={{ color }}>
          {char}
        </span>
      );
    });
  };
  return (
    <Box textAlign='center'>
      <Text letterSpacing='2px' m='auto' marginTop="20px" fontSize='20px' fontWeight='500' w={['300px','500px','600px','700px']} p='10px' textAlign='center'>
      {renderText()}
      </Text>
    </Box>
  );
};

export default Random;
