window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    loadUser();
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
    if (checkInput()){
        try {
            const response = await axios.put(`${url}/user/`, {
                id: localStorage.getItem("savedId"),
                name: document.getElementById("userName").value,
                email: document.getElementById("userEmail").value,
                phone: document.getElementById("userPhone").value,
                address: document.getElementById("userAddress").value,
                pass: document.getElementById("userPassword").value
              });
            console.log(response)
            alert("User updated!")
        } catch (err) {
            console.error("Error updating user:", err);
        }
        localStorage.removeItem("savedId");
        window.location.href = 'users.html';   
    }else{
        alert("Please fill out all of the forms!")
    }
}

function checkInput() {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const address = document.getElementById("userAddress").value.trim();
    const password = document.getElementById("userPassword").value.trim();

    return (name && email && phone && address && password);
}
