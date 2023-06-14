import React from "react";
import Result from "./Result";
import InputType from "./InputType";
import { Text } from "@chakra-ui/react";

function Home() {
  return (
    <div>
       <Text fontWeight='600' color='gray' fontSize='25px' pt='20px'>
        Touch Typing App
      </Text>
      <InputType />
      <Result />
    </div>
  );
}

export default Home;
