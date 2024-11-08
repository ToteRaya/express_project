//Here are all of the Methods that an user can do:
//DELETE, EDIT, FILTER, ADD, AUTH

//DEPENDECIES --------------------------------------------
const express = require('express');
const user = express.Router();
const db = require('../database');

user.get("/",async(req,res,next) =>{ 
    const results = await db.query("Select * from user");
    //console.log(results);
    if (results){
        return res.status(200).json(results);
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
}); //SELECT 

user.get("/:id([0-9]{1,3})",async(req,res,next) =>{ 
    const id = req.params.id;
    const results = await db.query(`SELECT * FROM user WHERE id = ${id}`);

    //console.log(results);
    
    if (results.affectedRows != 0){
        return res.status(200).json(results);
    }else{
        return res.status(404).json({code:404, message: "404: Usuario no encontrado"});
    }  
}); //SELECT w/Filter

user.get("/:name([A-Za-z]+)",async(req,res,next) =>{
    const name = req.params.name;
    const results = await db.query(`SELECT * FROM user WHERE name LIKE '${name}%'`);

    //console.log(results);
    
    if (results.affectedRows != 0){
        return res.status(200).json(results);
    }else{
        return res.status(404).json({code:404, message: "404: Usuario no encontrado"});
    }  
}); //SELECT w/Filter

user.post("/",async(req,res,next) =>{
    const {name, email, phone, address, pass} = req.body;
    // console.log({name});

    if (name && email && phone && address && pass){ //Checa que si los elementos estan dentro del body
        let sql = `INSERT INTO user(name, email, phone, address, pass) `
        sql += `VALUES ('${name}','${email}','${phone}','${address}','${pass}');`

        //Llega a hacer el query e lo imprime en la consola
        const rows = await db.query(sql); 
        //console.log(rows);

        if (rows.affectedRows > 0){
            return res.status(201).json({code:201, message: `Nuevo usuario: ${name}`});
        }else{
            return res.status(500).json({code:500, message: 'ERROR: SERVER NO FUNCIONA'});
        }
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
}); //INSERT

user.delete("/:id([0-9]{1,3})",async(req,res,next) =>{ 
    const { id } = req.params;
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

user.put("/",async(req,res,next) =>{
    const {id, name, email, phone, address, pass} = req.body;
    //console.log("Edit:" + {id});

    if (id && name && email && phone && address && pass){ //Checa que si los elementos estan dentro del body
        let sql = `UPDATE user SET `; // Add space after SET
        sql += `name ='${name}', `;
        sql += `email ='${email}', `;
        sql += `phone ='${phone}', `;
        sql += `address ='${address}', `;
        sql += `pass ='${pass}' `;
        sql += `WHERE id = ${id}`;

        //Llega a hacer el query e lo imprime en la consola
        const rows = await db.query(sql); 
        //console.log(rows);

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
