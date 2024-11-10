window.onload = init;
var headers = {};
var url = "http://localhost:3000";

//START UP FUNCTION -------------------------------------------------
function init(){
    //Checks if there's a token in the first place
    // if not, it returns to the index.html
    // loads up the headers to the local storage 
    // for authentication purposes.
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
    // This function pretty much loads whenever the search query has 
    // been modified, searching by either the id or the name
    event.preventDefault(); 
    getData().then(userData => {
        displayData(userData);
    });
}

//DISPLAY AND LOAD DATA ------------------------------------------------
function displayData(data) {
    // This function pretty much takes the data from getData()
    // and makes a for loop for each of the users to display their 
    // information and functions.

    const tableBody = document.getElementById('userbase').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; 

    //This for loop appends each element requested with its proper data
    data.forEach(user => {
        const row = document.createElement('tr');

        //ID --------------------------------------
        const idCell = document.createElement('td');
        idCell.textContent = user.id;
        row.appendChild(idCell);

        //Name --------------------------------------
        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        //Mail ---------------------------------------
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        //Phone ----------------------------------------
        const phoneCell = document.createElement('td');
        phoneCell.textContent = user.phone;
        row.appendChild(phoneCell);

        //Address -------------------------------------
        const addressCell = document.createElement('td');
        addressCell.textContent = user.address;
        row.appendChild(addressCell);

        //Password ---------------------------------------
        const passwordCell = document.createElement('td');
        passwordCell.textContent = user.pass;
        row.appendChild(passwordCell);

        //DELETE FUNCTION ----------------------------------
        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button"; //class =  delete-button
        deleteButton.onclick = () => deleteUser(user.id);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        //EDIT FUNCTION -----------------------------------
        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.className = "edit-button"; //class = edit-button
        editButton.onclick = () => editUser(user.id); 
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        tableBody.appendChild(row); // Append the row to the table body
    });
}

async function getData(){
    // This functions gets the data from the search input 
    // and modifies the results depending of the input.
    // The GET method for users, already covers both the
    // parameters of either an ID or an username.

    // Retrieve search input value
    const searchInput = document.getElementById('search');
    const searchValue = searchInput.value.trim(); 
    try {
        // Modify URL if searchValue exists
        const link = searchValue ? `${url}/user/${searchValue}` : `${url}/user/`; 
        const res = await axios.get(link, headers);
        //console.log(link);
        return res.data;
    } catch (err) {
        alert(err);
        //console.log(err);
        return [];
    }
}

//DELETE BUTTON --------------------------------------------------------
async function deleteUser(deleteId){
    // This function makes up a popup with the confirm function
    // and depending of the circumstances, it performs an action
    // wether an error, a denied or confirmed response is carried out.

    const confirmDelete = confirm(`Do you want to delete user with id: ${deleteId}`) ? true : false;
    if (confirmDelete){
        try {
            const link = `${url}/user/${deleteId}`;
            const res = await axios.delete(link, headers); 
            //console.log(res);
            alert("User deleted!");
            window.location.reload();
        } catch (err) {
            alert("User not deleted: " + err);
        }
    } else {
        alert("User not deleted");
    }
}

//EDIT BUTTON --------------------------------------------------------
function editUser(editId){
    //This function loads a savedId from its respective row
    //and loads it to the edit.html to handle it. 
    localStorage.setItem("savedId", editId);
    window.location.href = 'edit.html';  
}

//INSERT BUTTON --------------------------------------------------------
async function insertUser(){
    // This function checks if the format is correct with the checkInput and emailPhone functions
    // and then takes the values of the INSERT row to make up a query.

    if(checkInput() && emailPhone()){
        try {
            const response = await axios.post(`${url}/user/`, {
                name: document.getElementById("insertName").value,
                email: document.getElementById("insertEmail").value,
                phone: document.getElementById("insertPhone").value,
                address: document.getElementById("insertAddress").value,
                pass: document.getElementById("insertPassword").value
            }, headers); 
            alert("User inserted!");
            window.location.reload();
        } catch (err) {
            alert("ERROR: " + err);
        }
    }
}

//Checks if all of the inputs are in place because the PUT route function 
//wont work unless it gets all of its parameters filled.
function checkInput() {
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

//Returns true only when the mail and phone format are correct
//if not it makes up a pop up message
function emailPhone(){
    const email = document.getElementById("insertEmail").value;
    const phone = document.getElementById("insertPhone").value;

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

//EXIT FUNCTION ----------------------------------------------------------
//Removes the token and redirects to the login site
function exit() {
    localStorage.removeItem('token');  
    window.location.href = 'login.html';  
}
