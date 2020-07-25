
document.getElementById("ContactNav").onclick = function() {
    let name = document.getElementById("form34");
    let email = document.getElementById("form29");
    let subject = document.getElementById("form32");
    let usermessage = document.getElementById("form8");

    console.log(usermessage.value);

    if (name.value != "" || email.value != "" || subject.value != "" || usermessage.value != "") {
      name.value = "";
      email.value = "";
      subject.value = "";
      usermessage.value = "";
    }

}

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
      document.getElementById("SendButton").style.display = "none";
      document.getElementById("MessageSent").style.display = "unset";
    } else {
      document.getElementById("MessageNotSent").style.display = "unset";
    }
};

document.getElementById("LoginButton").onclick = async function() {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    const data = await fetch(`/users/${username}/${password}`);
    const dataJson = await data.json();

    console.log(dataJson.Success);
    
    if (dataJson.Success === true){
      window.location.href = "Admin.html"
    }
}

