require('dotenv').config();
const express = require("express");
const { response } = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.static('public'));


app.listen(3000, () => {
    console.log("Server is listening on port: 3000");
});

let url;
let pic;

app.get('/roverApi/:rover/:cam', async (request,response) => {
    const API_KEY = process.env.API_KEY;
    
    const rover = request.params.rover;
    const cam = request.params.cam;
    
    url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`;

    const fetch_response = await fetch(url);
    const json =  await fetch_response.json();

    for (let i = 0; i < json.photos.length; i++) {
        let CamObj = json.photos[i].camera;
        if (CamObj.name === cam){
            pic = json.photos[i].img_src;
            break;
        }
    }


    response.json(pic);

});
