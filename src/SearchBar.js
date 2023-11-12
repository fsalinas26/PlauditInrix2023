import React, { useState, useEffect,useRef } from 'react';
// Import your icons from wherever you have them
// For demonstration, let's assume you're using Font Awesome icons
// You can install it using `npm install @fortawesome/react-fontawesome`
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Function to fetch data from the endpoint

function SearchBar() {

const addressref = useRef(null);
const businessTyperef = useRef(null);

const fetchData = async () => {
    const coords_ = {
        command:"coords",
        address:`${addressref.current.value}`
    }
    return new Promise(async(resolve,reject)=>{
        const res = await axios.get('http://localhost:8801/post',{params:coords_}).then(async data=>{

        const coords____ = data;
        const params ={
            address:`${addressref.current.value}`,
            businesstype:`${businessTyperef.current.value}`
        }
        const image_ = {
            command:"image",
            lat:coords____.latitude,
            long:coords____.longitude
        }

        const competition_ = {
            command:"competition",
            lat:coords____.latitude,
            long:coords____.longitude,
            keyword:`${businessTyperef.current.value}`
        }
        const attraction_ = {
            command:"attraction",
            lat:coords____.latitude,
            long:coords____.longitude
        }
        const parking_ = {
            command:"parking",
            lat:coords____.latitude,
            long:coords____.longitude
        }

        const coords_response = await axios.get('http://localhost:8801/post',{params:coords_});
        document.getElementById("coords_response").textContent = `Coordinates ${coords_response.data}`;
        //const streetview_response = await axios.get('http://localhost:8801/post',{params:image_})
        const competition_response = await axios.get('http://localhost:8801/post',{params:competition_});
        document.getElementById("competition_response").textContent = `Nearby ${businessTyperef.current.value}'s: ${competition_response.data}`;
        const attraction_response = await axios.get('http://localhost:8801/post',{params:attraction_});
        document.getElementById("attraction_response").textContent = `Volume of people in the area ${attraction_response.data}`;
        const parking_score = await axios.get('http://localhost:8801/post',{params:parking_});
        let responseGPT = competition_response;
        document.getElementById("ChatGPT_Response").textContent = responseGPT;
        return responseGPT;
    })
    })
}

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    background: 'white', // Assuming the background is white
    borderRadius: '8px', // Adjust as needed for the desired roundness
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 1.0)', // For a subtle shadow, adjust as needed
  };

  const inputStyle = {
    flexGrow: 1,
    margin: '0 8px',
    padding: '10px',
    borderRadius: '5px', // Adjust as needed for the desired roundness
    border: '1px solid #ccc', // A subtle border color, adjust as needed
    outline: 'none', // Removes the default focus outline
  };

  const iconStyle = {
    color: '#007bff', // Example color, change as needed
    marginRight: '8px', // Space between icon and input text
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#007bff', // Example button color, change as needed
    color: 'white',
    border: 'none',
    borderRadius: '5px', // Adjust as needed for the desired roundness
    cursor: 'pointer',
  };
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set the loaded state to true once the component mounts
    setLoaded(true);
  }, []);
  return (
    <div className={loaded ? 'fadeUpAnimation':''} style={searchBarStyle}>
      {/* Input for location search */}
      <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
      <input
        id="address_input"
        type="text"
        ref={addressref}
        placeholder="Search By Location..."
        // value={"1161 Alameda Way, San Francisco CA"}
        style={inputStyle}
      />
      {/* Input for business type search */}
      <FontAwesomeIcon icon={faBriefcase} style={iconStyle} />
      <input
        id="business_type_input"
        type="text"
        ref={businessTyperef}
        placeholder="Type of Business..."
        // value={"Coffee Shops"}
        style={inputStyle}
      />
      {/* Search button */}
      <button style={buttonStyle} onClick={fetchData}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
