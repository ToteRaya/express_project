window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if (localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadUser();
    }else{
        window.location.href = "index.html";
    }    
}

async function loadUser(){
    try {
        const link = `${url}/user/${localStorage.getItem("savedId")}`;
        const res = await axios.get(link, headers);

        let userData = res.data[0];
        
        document.getElementById("userId").textContent = userData.id;
        document.getElementById("userName").value = userData.name;
        document.getElementById("userEmail").value = userData.email;
        document.getElementById("userPhone").value = userData.phone;
        document.getElementById("userAddress").value = userData.address;
        document.getElementById("userPassword").value = userData.pass;

    } catch (err) {
        alert("Error loading user data");
        localStorage.removeItem("savedId");
        window.location.href = 'users.html'; 
    }
}

async function submitEdit(){
    if (checkInput() && emailPhone()) {
        try {
            const response = await axios.put(`${url}/user/`, {
                id: localStorage.getItem("savedId"),
                name: document.getElementById("userName").value,
                email: document.getElementById("userEmail").value,
                phone: document.getElementById("userPhone").value,
                address: document.getElementById("userAddress").value,
                pass: document.getElementById("userPassword").value
            }, headers); // Include headers for authorization
            console.log(response);
            alert("User updated!");
        } catch (err) {
            console.error("Error updating user:", err);
        }
        localStorage.removeItem("savedId");
        window.location.href = 'users.html';   
    }
}

function checkInput() {//Checa si todos los valores estan llenados
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const address = document.getElementById("userAddress").value.trim();
    const password = document.getElementById("userPassword").value.trim();

    const returnvalue = (name && email && phone && address && password);
    if (!returnvalue){
        alert("Please fill out the form completely");
    }
    return returnvalue;
}

function emailPhone(){//Checa si el correo y telefono tienen sus respectivos formatos
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;

    // Regex
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }else if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number with digits only.");
        return false;
    }
    return true;   
}