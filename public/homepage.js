document.getElementById("SendButton").onclick = async function() {

    let name = document.getElementById("form34").value;
    let email = document.getElementById("form29").value;
    let subject = document.getElementById("form32").value
    let usermessage = document.getElementById("form8").value;

    let message = { name, email, subject, usermessage };

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      };

    console.log(options);
    const response = await fetch(`/ContactUs`, options);
    const data = await response.json();
};