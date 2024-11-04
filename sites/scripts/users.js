window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    getData().then(userData => {
        displayData(userData);
    });
}

// Function triggered when the form is submitted
function searchUser(event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page
    getData().then(userData => {
        displayData(userData);
    });
}

function displayData(data) {
    const tableBody = document.getElementById('userbase').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach(user => {
        const row = document.createElement('tr');

        // Populate each cell in the row with user data
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
