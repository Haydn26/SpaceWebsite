
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544'
var mymap = L.map('issMap').setView([51.505, -0.09], 1);
let initial = true;
var ISS;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

async function IssLocation(){
    const response = await fetch(iss_url);
    const data = await response.json();
    const lat = data.latitude;
    const long = data.longitude;

    if (initial){
        ISS = L.marker([lat, long]).addTo(mymap);
        initial = false;
    }
    mymap.setView([lat, long], 5);
    ISS = ISS.setLatLng([lat, long]);

};

IssLocation();
setInterval(IssLocation, 1000);