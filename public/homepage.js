document.getElementById("SendButton").onclick = async function() {

    let name = document.getElementById("form34").value;
    let email = document.getElementById("form29").value;
    let subject = document.getElementById("form32").value
    let usermessage = document.getElementById("form8").value;

    let message = { name, email, subject, usermessage };

    const response = await fetch(`/ContactUs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
    const data = await response.json();
    console.log(data);
};

document.getElementById("LoginButton").onclick = async function() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    const data = await fetch(`/users/${username}/${password}`);
    const dataJson = await data.json();
    console.log(dataJson);
}