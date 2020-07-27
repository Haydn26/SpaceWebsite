require("dotenv").config();
const db = require("nedb");
const express = require("express");
const { response, request, json } = require("express");
const fetch = require("node-fetch");
const app = express();
const API_KEY = process.env.API_KEY;
const port = process.env.PORT || process.env.port;
app.use(express.static("public/"));
app.use(express.json({ limit: "1mb" }));
let pic;

const database = new db("database.db");
database.loadDatabase();
const datastore = new db("credentials.db");
datastore.loadDatabase();
const starsDB = new db("stars.db");
starsDB.loadDatabase();

app.listen(`${port}`, () => {
  console.log(`Server is listening on port: ${port}`);
});

app.get("/roverApi/:rover/:cam", async (request, response) => {
  const rover = request.params.rover;
  const cam = request.params.cam;

  const Roverurl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`;

  const fetch_response = await fetch(Roverurl);
  const json = await fetch_response.json();

  for (let i = 0; i < json.photos.length; i++) {
    let CamObj = json.photos[i].camera;
    if (CamObj.name === cam) {
      pic = json.photos[i].img_src;
      break;
    }
  }
  response.json(pic);
});

app.get("/apod/:date", async (request, response) => {
  const requestDate = new Date(request.params.date);

  var selectedday = requestDate.getDate();
  var selectedmonth = requestDate.getMonth();
  var selectedYear = requestDate.getFullYear();
  var date = selectedYear + "-" + selectedmonth + "-" + selectedday;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

  const apodApiCall = await fetch(url);
  const apodJson = await apodApiCall.json();

  response.json(apodJson);
});

app.get("/locateISS", async (request, response) => {
  const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";

  const ISSApiresponse = await fetch(iss_url);
  const data = await ISSApiresponse.json();

  response.json(data);
});

function validData(body) {
  return (
    body.name &&
    body.name.toString() != "" &&
    body.email &&
    body.email.toString() != "" &&
    body.subject != "" &&
    body.usermessage != ""
  );
}

app.post("/ContactUs", (request, response) => {
  const data = request.body;

  if (validData(data)) {
    database.insert(data);

    response.json({
      success: true,
      data,
    });
  } else {
    response.status(422);
    response.json("Incorrect data submitted");
  }
});

app.get("/ContactUs", (req, res) => {
    const remarks = database.find({}, function ( err, docs) {
      if (err){
        res.status(422);
        res.json("Unable To Return any Responses")
        return;
      }
      res.json(docs);
    })
});

app.get("/users/:user/:password", (request, response) => {
  const password = request.params.password;
  const username = request.params.user;

  const dbuser = datastore.find({ UserName: `${username}` }, function (
    err,
    docs
  ) {
    if (err) {
      response.status(422);
      response.end();
      return;
    }

    for (let i = 0; i < 1; i++) {
      if (docs[i].UserName == username) {
        if (docs[i].Password == password) {
          let id = docs[i]._id;

          datastore.update(
            { UserName: username },
            { $set: { Token: "testing" } },
            function (err, num) {}
          );
          response.json(docs);
        }
      } else {
        response.status(422);
        response.json("Incorrect username or password");
      }
    }
  });
});

app.get("/Star", (request, response) => {
  starsDB.find({}, function (err, docs) {
    if (err) {
      response.end();
    } else {
      response.json(docs);
    }
  });
});

app.post("/Star", (request, response) => {
  const newStar = request.body;
  starsDB.insert(newStar);
});
