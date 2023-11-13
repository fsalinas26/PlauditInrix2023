import axios from 'axios'
import config from '../src/config.json'
class InrixAPI {
    constructor(appId, hashToken) {
        this.appId = config.INRIX_APPID;
        this.hashToken = config.INRIX_HASH_TOKEN;
        this.baseUrl = 'https://api.iq.inrix.com';
        this.token = ''
    }

    async getAppToken() {
        const url = `${this.baseUrl}/auth/v1/appToken?appId=${this.appId}&hashToken=${this.hashToken}`;
        try {
            const response = await axios.get(url);
            this.token = response.data["result"].token; // Assuming the response structure contains the token directly
            return this.token;
        } catch (error) {
            console.error('Error getting app token:', error);
        }
    }

    async getSpeedSegments(box) {
        const url = `${this.baseUrl}/v1/segments/speed?box=${box}`;
        try {
            const response = await axios.get(url, this.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error getting speed segments:', error);
        }
    }

    async getOffStreetParking(point, radius) {
        const url = `${this.baseUrl}/lots/v3?point=${point}&radius=${radius}`;
        try {
            const response = await axios.get(url, this.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error getting off-street parking:', error);
        }
    }

    async getOnStreetParking(point, radius) {
        console.log(point);
        const url = `${this.baseUrl}/blocks/v3?point=${point}&radius=50`;
        try {
            const response = await axios.get(url, this.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error getting on-street parking:', error);
        }
    }

    async getTradeTrips(radius, points, limit, startDateTime, endDateTime) {
        const url = `${this.baseUrl}/v1/trips-count?od=destination&geoFilterType=circle&radius=${radius}&points=${points}&startDateTime=%3E%3D2023-06-01T02:31&endDateTime=%3C%3D2023-06-15T02:31`;
        try {
            const response = await axios.get(url, this.getAuthHeaders())
            return response.data;
        } catch (error) {
            console.error('Error getting trade trips:', error);
        }
    }

    //Google places api
    async getPlaces(point, radius, keyword) {
        const googleApiKey = config.REACT_APP_GOOGLE_MAPS_API_KEY
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
        try {
            console.log(point);
            const response = await axios.get(url, {params:{location:`${point}`, radius:`${radius}`,keyword: `${keyword}`,key: `${googleApiKey}`}});
            return response.data;
        } catch (error) {
            console.error('Error getting Google Places data:', error);
        }
    }

    async getCoords(address) {
        const apiKey = config.REACT_APP_GOOGLE_MAPS_API_KEY// Replace with your actual API key
        const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
      
        try {
          const response = await axios.get(apiUrl, {
            params: {
              address: address,
              key: apiKey,
            },
          });
      
          const results = response.data.results;
          if (results.length > 0) {
            const location = results[0].geometry.location;
            const coords = {
              latitude: location.lat,
              longitude: location.lng,
            };
            return coords;
          } else {
            throw new Error('No results found for the given address.');
          }
        } catch (error) {
          console.error('Error converting address to coordinates:', error.message);
          throw error;
        }
      }

    async getStreetViewImage(coords){
        try {
          const apiKey = config.REACT_APP_GOOGLE_MAPS_API_KEY; 
          const response = await axios.get('https://maps.googleapis.com/maps/api/streetview', {
            params: {
              size: '400x400',
              location: `${coords}`,
              fov: '80',
              heading: '70',
              pitch: '0',
              key: `${apiKey}`
              // signature: SIGNATURE
            }
          });
        console.log(response.data);
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      };

    async getAuthHeaders() {
        return {
            headers: { 'Authorization': `Bearer ${this.getAppToken()}` }
        };
    }
    
}



export default InrixAPI;