window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
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

async function loadUser() {
    const userId = localStorage.getItem("savedId");
    if (!userId) {
        alert("User ID not found.");
        window.location.href = 'users.html';
        return;
    }

    try {
        const res = await axios.get(`${url}/user/${userId}`, headers);
        const userData = res.data[0];
        
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

async function submitEdit() {
    if (validateInputs() && validateEmailPhone()) {
        try {
            await axios.put(`${url}/user/${localStorage.getItem("savedId")}`, {
                name: document.getElementById("userName").value,
                email: document.getElementById("userEmail").value,
                phone: document.getElementById("userPhone").value,
                address: document.getElementById("userAddress").value,
                pass: document.getElementById("userPassword").value
            }, headers);
            alert("User updated successfully!");
            localStorage.removeItem("savedId");
            window.location.href = 'users.html';
        } catch (err) {
            alert("Error updating user.");
            console.error("Error:", err);
        }
    }
}

function cancelEdit() {
    localStorage.removeItem("savedId");
    window.location.href = 'users.html';
}

function validateInputs() {
    const fields = ["userName", "userEmail", "userPhone", "userAddress", "userPassword"];
    const filled = fields.every(id => document.getElementById(id).value.trim() !== "");

    if (!filled) {
        alert("Please fill out all fields.");
    }
    return filled;
}

function validateEmailPhone() {
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    } else if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return false;
    }
    return true;
}
