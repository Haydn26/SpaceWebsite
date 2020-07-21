require('dotenv').config();


const API_KEY = process.env.API_KEY;

let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function getAPOD(){
    const apod = await fetch(url);
    const data = await apod.json();
    document.getElementById("APODImg").src = data.url;
};
getAPOD();

$(function () {
    $('#datepicker').datepicker();
})

async function getNewPicture() {

    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy= today.getFullYear();

    if (dd < 10){
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    var now = mm + '/' + dd + '/' + yyyy;

    let selectDate = new Date(document.getElementById('datepicker').value);
    console.log(selectDate.getMonth() + 1);
    console.log(mm);

    var selectedday = selectDate.getDate();
    var selectedmonth = selectDate.getMonth();
    var selectedYear = selectDate.getFullYear();
    var date = selectedYear + '-' + selectedmonth + '-' + selectedday;


    if (selectedday < 10){
        selectedday = '0' + selectedday;
    }
    if (selectedmonth < 10) {
        selectedmonth = '0' + selectedmonth;
    }
    
    
    if (selectedmonth < mm){
        url = 'https://api.nasa.gov/planetary/apod?api_key=C7m8CxhDBLLztUzfdZbfaNststO2kWyWugwLaokK&date=' + date;
        let pic = await fetch(url);
        let dat = await pic.json();
        document.getElementById("APODImg").src = dat.url;
    } else if (selectedday <= dd && selectedmonth <= mm){
        url = 'https://api.nasa.gov/planetary/apod?api_key=C7m8CxhDBLLztUzfdZbfaNststO2kWyWugwLaokK&date=' + date;
        let pic = await fetch(url);
        let dat = await pic.json();
        document.getElementById("APODImg").src = dat.url;
    } else if (selectedYear < yyyy){
        url = 'https://api.nasa.gov/planetary/apod?api_key=C7m8CxhDBLLztUzfdZbfaNststO2kWyWugwLaokK&date=' + date;
        let pic = await fetch(url);
        let dat = await pic.json();
        document.getElementById("APODImg").src = dat.url;
    } else {
        alert("The date needs to be a date in the past or today's date");
    }
}