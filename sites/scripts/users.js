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
        getData().then(userData => {
            displayData(userData);
        });
    }else{
        window.location.href = "index.html";
    }    
}

function searchUser(event) {
    event.preventDefault(); 
    getData().then(userData => {
        displayData(userData);
    });
}

function displayData(data) {
    const tableBody = document.getElementById('userbase').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; 

    data.forEach(user => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = user.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = user.phone;
        row.appendChild(phoneCell);

        const addressCell = document.createElement('td');
        addressCell.textContent = user.address;
        row.appendChild(addressCell);

        const passwordCell = document.createElement('td');
        passwordCell.textContent = user.pass;
        row.appendChild(passwordCell);

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button"; //Clase delete-button
        deleteButton.onclick = () => deleteUser(user.id);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.className = "edit-button"; //Clase edit-button
        editButton.onclick = () => editUser(user.id); 
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        tableBody.appendChild(row); // Append the row to the table body
    });
}

async function getData(){
    const searchInput = document.getElementById('search');
    const searchValue = searchInput.value.trim(); // Retrieve search input value
    try {
        const link = searchValue ? `${url}/user/${searchValue}` : `${url}/user/`; // Modify URL if searchValue exists
        const res = await axios.get(link, headers);
        console.log(link);
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function deleteUser(deleteId){
    const confirmDelete = confirm(`Do you want to delete user with id: ${deleteId}`) ? true : false;
    if (confirmDelete){
        try {
            const link = `${url}/user/${deleteId}`;
            const res = await axios.delete(link, headers); 
            console.log(res);
            alert("User deleted!");
            window.location.reload();
        } catch (err) {
            alert("User not deleted: " + err);
        }
    } else {
        alert("User not deleted");
    }
}

function editUser(editId){
    localStorage.setItem("savedId", editId);
    window.location.href = 'edit.html';  
}

async function insertUser(){
    if(checkInput() && emailPhone()){
        try {
            const response = await axios.post(`${url}/user/`, {
                name: document.getElementById("insertName").value,
                email: document.getElementById("insertEmail").value,
                phone: document.getElementById("insertPhone").value,
                address: document.getElementById("insertAddress").value,
                pass: document.getElementById("insertPassword").value
            }, headers); // Passing headers here
            alert("User inserted!");
            window.location.reload();
        } catch (err) {
            alert("ERROR: " + err);
        }
    }
}

function checkInput() {//Checa si todos los valores estan llenados
    const name = document.getElementById("insertName").value.trim();
    const email = document.getElementById("insertEmail").value.trim();
    const phone = document.getElementById("insertPhone").value.trim();
    const address = document.getElementById("insertAddress").value.trim();
    const password = document.getElementById("insertPassword").value.trim();

    const returnvalue = (name && email && phone && address && password);
    if (!returnvalue){
        alert("Please fill out the form completely");
    }
    return returnvalue;
}

function emailPhone(){//Checa si el correo y telefono tienen sus respectivos formatos
    const email = document.getElementById("insertEmail").value;
    const phone = document.getElementById("insertPhone").value;

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