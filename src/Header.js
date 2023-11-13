import React from 'react';
import { Box,Image} from "@chakra-ui/react";
import {logof} from './public/logo.svg'
import SearchBar from './SearchBar'

function Header() {
    
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    background:"rgba(0,123,255,0.7)",
    padding: '10px 30px',
    boxShadow: '0px 2px 4px #1a1a1a',
    color: 'white'
  };

  const navItemStyle = {
    margin: '0 10px',
    cursor: 'pointer'
  };

  const logoStyle = {
    height: '50px',
    cursor: 'pointer'
  };

  return (
    <Box minH="3vh" 
    alignItems="center" 
    fontFamily="Montserrat" 
    fontWeight={"thin"} 
    style={navStyle}>
      {/* Logo */}
      
      {/* Navigation Links */}
      <div style={{ display: 'flex' }}>
        <div style={navItemStyle}>Features</div>
        <div style={navItemStyle}>How it Works</div>
        <div style={navItemStyle}>About Us</div>
        <div style={navItemStyle}>Contact Us</div>
      </div>
      {/* Sign In */}
      <div style={{ display: 'flex',marginLeft:"auto"}}>
        <div style={navItemStyle}>Sign In</div>
      </div>
    </Box>
  );
}

export default Header;
