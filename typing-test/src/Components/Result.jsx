import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function Result() {
  const { accuracy, pressedkey, wpm } = useSelector(
    (store) => store.AppReducer
  );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          gap: "40px",
          marginTop: "50px",
        }}
      >
        <Text fontWeight='600' fontSize='20px'>
          <Box>WPM : {wpm}</Box>
        </Text>
        <Text fontWeight='600' fontSize='20px'>
          <Box>Accuracy : {`${accuracy}%`}</Box>
        </Text>
      </Box>
      <Text fontWeight='600' fontSize='20px' >
        <Text>
          Key Pressed in 5 min : {pressedkey}
        </Text>
      </Text>
    </Box>
  );
}

export default Result;
