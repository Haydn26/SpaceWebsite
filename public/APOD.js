
$(function () {
    $('#datepicker').datepicker();
})

window.onload = async function(e) {
    const date = getTodaysDate();
    const apod = await fetch(`/apod/${date}`);
    const json = await apod.json();
    console.log(json);
    document.getElementById("APODImg").src = json.url;
}

document.getElementById("datepicker").onchange = async function(e){
    let date = new Date(document.getElementById('datepicker').value);

    const apodimg = await fetch(`/apod/${date}`);
    const apodjson = await apodimg.json();
    document.getElementById("APODImg").src = apodjson.url;

}

function getTodaysDate() {
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

    return yyyy + '-' + mm + '-' + dd;
}