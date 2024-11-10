// This function pretty much returns a token and
// saves it up in the local storage memory

function login(){
    var axios_mail = document.getElementById('userEmail').value;
    var axios_pass = document.getElementById('userPassword').value;
    //console.log(mail, pass);

    //Remember that the axios script is already in the html
    axios({
        method:'post',
        url:'http://localhost:3000/login',
        data:{
            email: axios_mail,
            password: axios_pass
        }
    }).then(function(res){
        //Checks up the response given and alerts the user
        //if there's anything wrong or if it saves up the token
        
        //console.log(res.data);
        if (res.data.code == 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "users.html"
        }else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err){
        alert("Error: "+ err)
        //console.log(err);
    })
}