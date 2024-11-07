function login(){
    var axios_mail = document.getElementById('userEmail').value;
    var axios_pass = document.getElementById('userPassword').value;
    //console.log(mail, pass);

    //axios esta ya en el html 
    axios({
        method:'post',
        url:'http://localhost:3000/login',
        data:{
            email: axios_mail,
            password: axios_pass
        }
    }).then(function(res){
        //checa la respuesta
        //console.log(res.data);
        if (res.data.code == 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "users.html"
        }else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    })
}