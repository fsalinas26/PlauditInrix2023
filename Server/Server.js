import express from 'express';
import cors from 'cors';
import ChatGPTAPI from './chatgpt.js'; // Adjust the path to where your ChatGPT module is located
import PlauditApi from './PlauditAPI.js'
const chatGPT = new ChatGPTAPI();

const app = express();

app.use(cors());
let Inrix = new PlauditApi();


const RADIUS = 150;
app.use(express.json());
let latitude = 0;
let longitude =0; 
app.get('/post',async(req,res)=>{
    const command = req.query.command;
    let data = {};
    switch(command){
        case 'parking':
            data = await Inrix.getParkingScore(`${latitude}%7C${longitude}`,"50");
            break;
        case 'attraction':
            data = await Inrix.getAttractionScore("150m",`${latitude}%7C${longitude}`,`>=2023-06-01T02:31`,`<=2023-06-15T02:31`);
            break;
        case 'coords':
            console.log(req.query.address);
            data = await Inrix.getCoords(`${req.query.address}`);
            console.log(data);
            latitude= data.latitude;
            longitude= data.longitude;
            res.send(data);
            break;
        case 'competition'://google api
            data = await Inrix.getCompetitionScore(`${latitude}, ${longitude}`,"2000",`${req.query.keyword}`);
            console.log(`${req.query.keyword}`);
            break;
        case 'image':
            data = await Inrix.getStreetViewImage(`${req.query.lat}%7C${req.query.long}`);
        default:
            break;

    }
    res.send(data instanceof String ? data:data.toString());
})
// Define a route for prompting ChatGPT
app.get('/chat', async(req, res) => {
  try {
    const business_type = req.query.businesstype;
    const address = req.query.address;
    console.log(business_type);
    const prompt = `Based on my business interest ($${business_type}) and my desire to establish\
                    a practice near ${address}. What are some insights you can give me regarding\
                    traffic insights, and car traffic, that might benefit me purchasing property\
                    there to start my establishment`;
    const response = await chatGPT.prompt(prompt);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Specify the port
const PORT = process.env.PORT || 8801;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
