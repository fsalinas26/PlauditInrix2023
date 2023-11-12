import React from 'react';
import "./styles.css";
import logo from './public/logo.svg'
import SearchBar from './SearchBar'

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
  Center,
} from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box
    id="header"
    color={"black"}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    background="rgba(0,0,0,0.0)"
    fontFamily="Montserrat"
    fontWeight={"extrabold"}
    width={"60vw"}
    margin={"auto"}
    minH={"40vh"}
    >
      <SearchBar
      />
    </Box>
  );
};

export default NavBar;
