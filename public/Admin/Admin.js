window.onload = async function (e) {
    const root = document.createElement("p");
    root.id = "root";

  async function allowedAccess() {
    const AccessData = await fetch('/users');
    const AllowedAccess = await AccessData.json();
  }

  if (allowedAccess()) {
    const ContactData = await fetch("/ContactUs");
    const ContactJson = await ContactData.json();
    console.log(ContactJson);

    for (let i = 0; i < ContactJson.length; i++) {
      const name = document.createElement("div");
      const email = document.createElement("div");
      const subject = document.createElement("div");
      const message = document.createElement("div");
      root.append(name, email, subject, message);

      name.textContent = `Name: ${ContactJson[i].name}`;
      email.textContent = `Email: ${ContactJson[i].email}`;
      subject.textContent = `Subject: ${ContactJson[i].subject}`;
      message.textContent = `Message: ${ContactJson[i].usermessage}`;

    }
  } else {
    const error = document.createElement("div");

    error.textContent = "Access Is Not Permitted"
    root.append(error);
  }

  document.getElementById("commentContainer").append(root);
};
