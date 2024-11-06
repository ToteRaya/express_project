window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    getData().then(userData => {
        displayData(userData);
    });
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
    popup = confirm(`Do you want to delete user with id: ${deleteId}`)? true: false;
    if (popup){
        try {
            const link = `${url}/user/${deleteId}`;
            const res = await axios.delete(link, headers);
            console.log(res);
            alert("User deleted!");
            window.location.reload();
        } catch (err) {
            alert("User not deleted:" + err);
        }
    }else{
        alert("User not deleted");
    }
}

function editUser(editId){
    localStorage.setItem("savedId", editId);
    window.location.href = 'edit.html';  
}
