import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecond((second) => second + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const min = Math.floor(second / 60);
  const Seconds = second % 60;

  return (
    <Box>
      {min}m {Seconds}s
    </Box>
  );
};

export default Timer;
