import axios from 'axios';

const fetchData = async (addressref,businessTyperef) => {
    let coords_ = {
        command:"coords",
        address:`${addressref.current.value}`
    }
    return new Promise(async(resolve,reject)=>{
        const res = await axios.get('http://localhost:8801/post',{params:coords_})
        let coords____ = await res;

        const params ={
            address:`${addressref.current.value}`,
            businesstype:`${businessTyperef.current.value}`
        }
        const chatgptres = await axios.get('http://localhost:8801/chat',{params:params})
        document.getElementById("ChatGPT_Response").textContent = chatgptres.data;
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
       
        const competition_response = await axios.get('http://localhost:8801/post',{params:competition_});
        document.getElementById("competition_response").textContent = `Nearby ${businessTyperef.current.value}'s: ${competition_response.data}`;
        //const attraction_response = await axios.get('http://localhost:8801/post',{params:attraction_});
        //document.getElementById("attraction_response").textContent = `Volume of people in the area ${attraction_response.data}`;
        const parking_score = await axios.get('http://localhost:8801/post',{params:parking_});
        document.getElementById("parking_score").textContent = `Parking Density: ${parking_score.data}`;

    })
}

export default fetchData;