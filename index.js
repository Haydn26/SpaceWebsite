require('dotenv').config();
const express = require("express");
const { response } = require("express");
const fetch = require("node-fetch");
const app = express();
const API_KEY = process.env.API_KEY; 
const port = process.env.PORT || process.env.port;  
app.use(express.static('public/'));
let pic;


app.listen(`${port}`, () => {
    console.log(`Server is listening on port: ${port}`);
});


app.get('/roverApi/:rover/:cam', async (request,response) => {
    const rover = request.params.rover;
    const cam = request.params.cam;
    
    const Roverurl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`;

    console.log(Roverurl);

    const fetch_response = await fetch(Roverurl);
    console.log(fetch_response);
    const json =  await fetch_response.json();
    console.log(json);

    for (let i = 0; i < json.photos.length; i++) {
        let CamObj = json.photos[i].camera;
        if (CamObj.name === cam){
            pic = json.photos[i].img_src;
            break;
        }
    }
    response.json(pic);
});

app.get('/apod/:date', async (request, response) => {

    const requestDate = new Date(request.params.date);

    var selectedday = requestDate.getDate();
    var selectedmonth = requestDate.getMonth();
    var selectedYear = requestDate.getFullYear();
    var date = selectedYear + '-' + selectedmonth + '-' + selectedday;

    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

    const apodApiCall = await fetch(url);
    const apodJson = await apodApiCall.json();

    response.json(apodJson);

})

app.get('/locateISS', async (request, response) => {
    const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544'

    const ISSApiresponse = await fetch(iss_url);
    const data = await ISSApiresponse.json();

    response.json(data);
})