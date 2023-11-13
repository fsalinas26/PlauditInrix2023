import React, { useState, useEffect,useRef } from 'react';
// Import your icons from wherever you have them
// For demonstration, let's assume you're using Font Awesome icons
// You can install it using `npm install @fortawesome/react-fontawesome`
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import fetchData from './FetchData'
import { add } from 'lodash';
// Function to fetch data from the endpoint

function SearchBar() {

const addressref = useRef(null);
const businessTyperef = useRef(null);

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
      <button style={buttonStyle} onClick={fetchData(addressref,businessTyperef)}>SEARCH</button>

    </div>
  );
}

export default SearchBar;
