require('dotenv').config();
const express = require("express");
const { response } = require("express");
const fetch = require("node-fetch");
const app = express();
const API_KEY = process.env.API_KEY; 
const port = process.env.PORT || process.env.port;  
app.use(express.static('public'));


app.listen(`${port}`, () => {
    console.log(`Server is listening on port: ${port}`);
});

let pic;

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
    console.log(requestDate);

    var selectedday = requestDate.getDate();
    console.log(selectedday);
    var selectedmonth = requestDate.getMonth();
    console.log(selectedmonth);
    var selectedYear = requestDate.getFullYear();
    console.log(selectedYear);
    var date = selectedYear + '-' + selectedmonth + '-' + selectedday;

    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

    const apodApiCall = await fetch(url);
    //console.log(apodApiCall);
    const apodJson = await apodApiCall.json();
    //console.log(apodJson);

    response.json(apodJson);

})
