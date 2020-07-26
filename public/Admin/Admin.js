window.onload = async function(e) {
    const ContactData = await fetch('/ContactUs');
    const ContactJson = await ContactData.json();
    console.log(ContactJson);


    for (let i = 0; i < ContactJson.length; i++){
        const root = document.createElement("p");
        const name = document.createElement("div");
        const email = document.createElement("div");
        const subject = document.createElement("div");
        const message = document.createElement("div");
        root.append(name, email, subject, message);

        name.textContent = `Name: ${ContactJson[i].name}`;
        email.textContent = `Email: ${ContactJson[i].email}`;
        subject.textContent = `Subject: ${ContactJson[i].subject}`;
        message.textContent = `Message: ${ContactJson[i].usermessage}`;
        
        document.body.append(root);
    }
};