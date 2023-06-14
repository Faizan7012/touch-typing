import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import Home from "./Components/Home";

function App() {
  return (
    <Box className="App" h='100vh' display='grid' placeItems='center'>
      <Home />
    </Box>
  );
}

export default App;
