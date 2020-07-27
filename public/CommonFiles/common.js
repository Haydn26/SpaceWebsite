//TODO!!!! Fix where the common html files are sourced. 
$(function() {
  $("#footer").load("http://localhost:3000/CommonFiles/Footer.html");
  $("#headNav").load("http://localhost:3000/CommonFiles/headNavBar.html");
  $("#header").load("http://localhost:3000/CommonFiles/header.html");
  $("#contactModal").load("http://localhost:3000/CommonFiles/ContactModal.html");
  $("#adminModal").load("http://localhost:3000/CommonFiles/AdminModal.html");
})

document.getElementById("contactModal").onclick = function() {
    let name = document.getElementById("form34");
    let email = document.getElementById("form29");
    let subject = document.getElementById("form32");
    let usermessage = document.getElementById("form8");

    if (name.value != "" || email.value != "" || subject.value != "" || usermessage.value != "") {
      name.value = "";
      email.value = "";
      subject.value = "";
      usermessage.value = "";
    }
    document.getElementById("MessageSent").style.display = "none";
    document.getElementById("MessageNotSent").style.display = "none";
    document.getElementById("SendButton").style.display = "unset";
};

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
    
    if (data.success === true) {
      document.getElementById("MessageNotSent").style.display ="none";
      document.getElementById("SendButton").style.display = "none";
      document.getElementById("MessageSent").style.display = "unset";
    } else {
      document.getElementById("MessageNotSent").style.display = "unset";
    }
};

document.getElementById("LoginButton").onclick = async function() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;


    const user = {username, password}

    const data = await fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    //const dataJson = await data.json();

    //console.log(dataJson);
    
    // if (dataJson.status === 200){
    //   window.location.href = "Admin.html"
    // }
};

