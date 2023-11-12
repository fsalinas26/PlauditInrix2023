import config from "./config.json";
import React from "react";
import axios from "axios";
import "./styles.css";
import {getMapStyles} from './styles';
import "./api";
import NavBar from './NavBar'
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
import Header from './Header'
import RightAlignedBox from './RightAlignedBox';
import { FaLocationArrow } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { get_walkers, request_walker,addRequest, wait } from "./api";




var center = { lat: 37.3496, lng: -121.939 };


if (navigator.geolocation) { // if the browser supports geolocation
   navigator.geolocation.getCurrentPosition(position => { // get the current position
    center.lat = position.coords.latitude 
    center.lng = position.coords.longitude
  })
} else {
    alert("Geolocation is not supported by this browser.")
}
var component; 

function App() {
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: config.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ null);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }
  async function calculateRoute() {
    // originRef.current.value = center;
    // destiantionRef.current.value = {lat:37.3541,lng:-121.9552};
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }
    const santa_clara_coords = {lat:37.3541,lng:-121.9552};
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,// originRef.current.value,
      destination: santa_clara_coords,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  } 


  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="150vh"
      w="100vw"
    >
      <Box id="mapViewPort" position="absolute" top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            styles: getMapStyles(),
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Flex
      >
      </Flex>      
      <Flex
        zIndex={1}
        minW={"100vw"}
        flexDirection="column"
        minH="200vh"
      >
      <Header/>  
      <NavBar
      />
      <RightAlignedBox destiantionRef={destiantionRef}/>
      </Flex>
    </Flex>
  );
}

export default App;
