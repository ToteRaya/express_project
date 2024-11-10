window.onload = init;
var headers = {};
var url = "http://localhost:3000";

//STARTING FUNCTION --------------------------------------------------
function init() {
    //Checks if a token exists in the first place
    //to send them to the login or database site
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        };
        loadUser();
    } else {
        window.location.href = "index.html";
    }    
}


//DATABASE TABLE -----------------------------------------------------
async function loadUser() {
    //With the id given in user.js at the local storage, use it to make up a 
    //select query and fill said info to the input forms
    const userId = localStorage.getItem("savedId");
    if (!userId) {
        alert("User ID not found.");
        window.location.href = 'users.html';
        return;
    }

    try {
        //Select query with userId
        const res = await axios.get(`${url}/user/${userId}`, headers);
        const userData = res.data[0];
        
        //Fill in info
        document.getElementById("userId").textContent = userData.id;
        document.getElementById("userName").value = userData.name;
        document.getElementById("userEmail").value = userData.email;
        document.getElementById("userPhone").value = userData.phone;
        document.getElementById("userAddress").value = userData.address;
        document.getElementById("userPassword").value = userData.pass;
    } catch (err) {
        alert("Error loading user data.");
        localStorage.removeItem("savedId");
        window.location.href = 'users.html'; 
    }
}


//SUBMIT FUNCTION ---------------------------------------------------
async function submitEdit(){
    //Checks if all of the inputs are valid
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

//Checks if all of the inputs are in place because the PUT route function 
//wont work unless it gets all of its parameters filled.
function checkInput() {
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

//Returns true only when the mail and phone format are correct
//if not it makes up a pop up message
function emailPhone(){//Checa si el correo y telefono tienen sus respectivos formatos
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;

    // Regex
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[\d\(\)\+\-\s\.,]*$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }else if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number with digits only.");
        return false;
    }
    return true;   
}

//CANCEL FUNCTION------------------------------------------------------ 
//This function is used to logout of the edit site,
//is also used to remove the saveId from the localstorage
//if an error is encountered or a submit edit is donde.
function cancelEdit() {
    localStorage.removeItem("savedId");
    window.location.href = 'users.html';
}
