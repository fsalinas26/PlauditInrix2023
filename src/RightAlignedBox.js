import React, { useState, useEffect } from 'react';
import { 
  Image,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import RatingBlock from '../ReviewComp';


const RightAlignedBox = ({destiantionRef}) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set the loaded state to true once the component mounts
    setLoaded(true);
  }, []);
  return (
    <Box className={loaded ? 'fadeUpAnimation':''}
          id="walkerContainer"
          p={5}
          borderRadius="lg"
          borderBottomRightRadius={0}
          borderBottomLeftRadius={0}
          m={10}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          fontFamily="Montserrat"
          flexGrow={1}
          bgColor={"#F6F1F1"}
          shadow="base"
          zIndex="1"
          margin="0px"
          gap="10px"
          onLoad={() => {
            
          }}
        >
          
            <Box
            width={"50vw"}>
            </Box>

            <Box
            flexGrow={1}
            minW={"60vw"}
            maxW={"60vw"}
            bgColor={"white"}
            borderRadius={"12px"}
            padding="10px"
            boxShadow='0px 2px 4px rgba(0, 0, 0, 0.4)'// For a subtle shadow, adjust as needed

            >
              <Box>
              <Image />
              </Box>
           
            <Text
            >
              <div id="ChatGPT_Response"></div>
              <div id="coords_response"></div>
              <div id="competition_response"></div>
              <div id="attraction_response"></div>
              <div id="parking_score"></div>
            </Text>
            </Box>
 
          

        </Box>
  );
};

export default RightAlignedBox;
