//Here are all of the Methods that an user can do:
//DELETE, EDIT, FILTER, ADD, AUTH

//DEPENDECIES --------------------------------------------
const express = require('express');
const user = express.Router();
const db = require('../database');

//SELECT -------------------------------------------------------------------------------------
user.get("/",async(req,res,next) =>{ 
    const results = await db.query("Select * from user");
    console.log(results);
    if (results){
        return res.status(200).json(results);
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
}); //SELECT W/FILTER 

user.post("/",async(req,res,next) =>{ //INSERT -----------------------------------------------
    const {name, email, phone, address, pass} = req.body;
    // console.log({name});

    if (name && email && phone && address && pass){ //Checa que si los elementos estan dentro del body
        let sql = `INSERT INTO user(name, email, phone, address, pass) `
        sql += `VALUES ('${name}','${email}','${phone}','${address}','${pass}');`

        //Llega a hacer el query e lo imprime en la consola
        const rows = await db.query(sql); 
        console.log(rows);

        if (rows.affectedRows > 0){
            return res.status(201).json({code:201, message: `Nuevo usuario: ${name}`});
        }else{
            return res.status(500).json({code:500, message: 'ERROR: SERVER NO FUNCIONA'});
        }
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
}); 

user.delete("/",async(req,res,next) =>{ //DELETE -----------------------------------------------
    const {id} = req.body;
    console.log("Delete: "+ {id});

    if (id){ //Checa que si los elementos estan dentro del body
        const sql = `DELETE FROM user WHERE id = ${id}`;

        //Llega a hacer el query e lo imprime en la consola
        const rows = await db.query(sql); 
        console.log(rows);

        if (rows.affectedRows > 0){
            return res.status(201).json({code:201, message: `Usuario eliminado: ${id}`});
        }else{
            return res.status(500).json({code:500, message: 'ERROR: SERVER NO FUNCIONA'});
        }
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Dato no insertado...'});
    }
}); //DELETE

user.put("/",async(req,res,next) =>{ //UPDATE -----------------------------------------------
    const {id, name, email, phone, address, pass} = req.body;
    console.log("Edit:" + {id});

    if (id && name && email && phone && address && pass){ //Checa que si los elementos estan dentro del body
        let sql =  `UPDATE user SET`; 
        sql += `name ='${name}',`;
        sql += `email ='${email}',`;
        sql += `phone ='${phone}',`;
        sql += `address ='${address}',`;
        sql += `pass ='${pass}',`;

        sql += `WHERE id = ${id}`

        //Llega a hacer el query e lo imprime en la consola
        const rows = await db.query(sql); 
        console.log(rows);

        if (rows.affectedRows > 0){
            return res.status(201).json({code:201, message: `Usuario editado: ${id}`});
        }else{
            return res.status(500).json({code:500, message: 'ERROR: SERVER NO FUNCIONA'});
        }
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
}
); //UPDATE 

module.exports = user;

// id int(11) NOT NULL,
//   name varchar(50) NOT NULL,
//   email varchar(50) NOT NULL,
//   phone varchar(20) NOT NULL,
//   address varchar(150) NOT NULL,
//   pass varchar(50) NOT NULL
