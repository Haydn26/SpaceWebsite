let url;
document.forms['RoverForm'].elements['cameras'].onchange = async function(e) {

    const rover = document.getElementById('rovers').value.toString();
    const cam = document.getElementById('cameras').value.toString();

    const apiCall = await fetch(`/roverApi/${rover}/${cam}`);
    const response = await apiCall.json();
    document.getElementById("RoverImg").src = response;
    document.getElementById("roverImage").href = response;
}