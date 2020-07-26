
var mymap = L.map('issMap').setView([0, 0], 5);
let initial = true;
var ISS;


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

async function IssLocation(){

    const getISS = await fetch('/locateISS');
    const data = await getISS.json();

    const lat = data.latitude;
    const long = data.longitude;

    if (initial){
        ISS = L.marker([lat, long]).addTo(mymap);
        initial = false;
    } else {
        mymap.setView([lat, long]);
        ISS = ISS.setLatLng([lat, long]);
    }
};

$('#MapModal').on('show.bs.modal', function(){
    setTimeout(function() {
      mymap.invalidateSize();
    }, 10);
   });

//document.getElementById("ModalButton").onclick = IssLocation();
setInterval(IssLocation, 1000);