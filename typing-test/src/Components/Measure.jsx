import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plainText } from "./Textarr";
import Keyboard from "./Keyboard";
const Measure = () => {
  const presentText = useSelector((store) => store.AppReducer.presentText);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [inputtypes, setInputtypes] = useState("");
  const [presenttchar, setPresenttchar] = useState(presentText[0]);
  const [runt, setRunt] = useState(null);
  const [all, setAll] = useState(1);
  const [gltchars, setGltchars] = useState(0);
  const [curc, setCurc] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [times, setTimes] = useState(null);
  const [allchar, setAllchar] = useState(0);
  const [gltchar, setGltchar] = useState(0);
  const level = "plainText";

  const dispatch = useDispatch();

  if (seconds % 300 === 0 && seconds !== 0 && times) {
    clearInterval(times);
    setSeconds(0);
    dispatch({ type: "5MIN", payload: { allchar } });
  }
  if(seconds % 60 === 0 && seconds){
    dispatch({ type: "WPMCHANGE", payload: { WPM: Math.floor(allchar / (seconds/60))} });
  }

  function runtr() {
    setAllchar(0);
    setGltchar(0);
    let id = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setTimes(id);
  }

  const handleTextChange = () => {
    if (level === "plainText") {
      const randomValue = Math.floor(Math.random() * plainText.length);
      setPresenttchar(plainText[randomValue][0]);
      dispatch({ type: "CHANGE", payload: plainText[randomValue] });
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    dispatch({ type: "ONCHANGE", payload: { text : value } });
    dispatch({ type: "WPMCHANGE", payload: { WPM: seconds > 59 ? Math.floor(allchar / (seconds/60)) : allchar} });
    setInputtypes(value);
    if (seconds === 0 && !times) {
      let id = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      setTimes(id);
    }

    let test = "";
    for (let i = 0; i < value.length; i++) {
      test = test + presentText[i];
      if (value[i] === presentText[i] && curc[i] === undefined) {
        curc[i] = true;
        setCurc({ ...curc });
      } else if (curc[i] === undefined) {
        curc[i] = false;
        setCurc({ ...curc });
      }
    }

     if (value.length > inputtypes.length) {
      setAll((pre) => pre + 1);
      setAllchar(allchar + 1);
    }
  
    if (!runt) {
      setRunt(Date.now());
    }

    if (test !== value) {
       setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, 1000);
      setGltchars(gltchars + 1);
      setGltchar(gltchar + 1);
    } else {
      if (value[value.length - 1] === presentText[value.length - 1]) {
        setPresenttchar(presentText[value.length]);
      }
    }

    if (test === value && value.length === presentText.length) {
      const match = (Date.now() - runt) / 1000;
      const WPM = Math.round(all / 5 / (match / 60));
      const NumWPM = Math.round((all - gltchars) / 5 / (match / 60));

      const accuracy = Math.floor((NumWPM * 100) / WPM);

      setInputtypes("");
      setRunt(null);
      setAll(1);
      setCurc({});
      setGltchars(0);
      dispatch({ type: "SHOW", payload: { wpm: seconds > 59 ? Math.floor(allchar / (seconds/60)) : allchar, accuracy: accuracy } });
      dispatch({ type: "ONCHANGE", payload: { text : '' } });
      handleTextChange();
    }
  };

  useEffect(() => {
    handleTextChange();
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secondss = seconds % 60;

  return (
    <Box
     className={`container ${shakeAnimation ? 'shake' : ''}`}>
       <Textarea
      w={['300px','400px','500px','600px']}
      fontWeight='600'
      fontSize='20px'
      minH='150px'
        placeholder="Start Typing........"
            marginTop= "20px"
            borderRadius= "10px"
            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
            value={inputtypes}
            onChange={handleInput}
          />
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        gap={"20px"}
        marginTop={"20px"}
        marginBottom={"30px"}
      >
        <Flex justifyContent= "center" alignItems='center'> 
          <Text fontWeight='600' fontSize='20px'>Next Key -</Text>
          <Button
              variant="outlined"
              color= "white"
              marginLeft= "20px"
              backgroundColor= "teal"
              fontSize='20px'
              alignItems='center'
          >
            {presenttchar === " " ? "Space" : presenttchar}
          </Button>
        </Flex>
        <Box
            fontSize="20px"
        >
          {minutes}m {secondss}s
          {seconds === 0 && (
            <Button
              variant="outlined"
                marginLeft= "10px"
                color="white"
                backgroundColor= "teal"
                onClick={runtr}
            >
              Start
            </Button>
          )}
        </Box>
      </Box>
      <Keyboard currKey={presenttchar === " " ? "Space" : presenttchar} />

    </Box>
  );
};

export default Measure;
