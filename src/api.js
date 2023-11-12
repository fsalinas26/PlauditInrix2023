// import axios from 'axios';

// // Function to fetch data from the endpoint
// const fetchData = async () => {
//   try {
//     let address_ = document.getElementById("address").textContent;
//     let businesstype_ = document.getElementById("business_type").textContent;
//     document.getElementById("ChatGPT_Response").textContent = "fetching response";
//     // Make a request to the specified endpoint
//     const params ={
//         address:`${address_}`,
//         businesstype:`${businesstype_}`
//     }
//     console.log(params);
//     const response = await axios.get('http://localhost:8801/chat',{params});
//     // Log or process the response data
//     let responseGPT = response.data;
//     document.getElementById("ChatGPT_Response").textContent = responseGPT;
//     return response.data;
//   } catch (error) {
//     // Handle any errors here
//     console.error('Error fetching data:', error);
//   }
// };

// export default fetchData;