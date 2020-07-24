require('dotenv').config();
const db = require("nedb");
const express = require("express");
const { response, request } = require("express");
const fetch = require("node-fetch");
const app = express();
const API_KEY = process.env.API_KEY; 
const port = process.env.PORT || process.env.port;  
app.use(express.static('public/'));
app.use(express.json({ limit: '1mb' }));
let pic;

const database = new db('database.db');
database.loadDatabase();
const datastore = new db('credentials.db');
datastore.loadDatabase();

app.listen(`${port}`, () => {
    console.log(`Server is listening on port: ${port}`);
});


app.get('/roverApi/:rover/:cam', async (request,response) => {
    const rover = request.params.rover;
    const cam = request.params.cam;
    
    const Roverurl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`;

    const fetch_response = await fetch(Roverurl);
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

});

app.get('/locateISS', async (request, response) => {
    const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544'

    const ISSApiresponse = await fetch(iss_url);
    const data = await ISSApiresponse.json();

    response.json(data);
});

app.post('/ContactUs', async (request, response) => {
    const data = request.body;

    database.insert(data);
    response.json(data);
});

app.get('/users/:user/:password', (request, response) => {
    
    datastore.insert({UserName: 'Haydn.Greenfield', Password: 'Testing'});

    console.log('We are in the users API');
    const password = request.params.password;
    const username = request.params.user;

    console.log(password);
    console.log(username);

    const dbuser = datastore.find({UserName: `${username}`}, function (err, docs) {
        if (err) {
            response.json({
                Success: false
            })
            response.end();
            return;
        }

    console.log(docs);

    // for (let i = 0; i < docs.length; i++){
    //     if (docs[i].UserName === username){
    //         if (docs[i].password === password) {
    //             response.json({
    //                 Success: true
    //             })
    //         }
    //         else{
    //             response.json({
    //                 Success: false
    //             })
    //         }
    //     }
    //     else {
    //         response.json({
    //             Success: false
    //         })
    //     }
    // }

    });
})