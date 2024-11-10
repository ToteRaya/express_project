//DEPENDECIES --------------------------------------------
const express = require('express');
const login = express.Router();
const db = require('../database');
const jwt = require('jsonwebtoken');

//Este metodo es un select en donde,
// al encontrar una fila en el sql,
// firma un token y lo regresa como 
// un mensage.

//La contraseña para los token jwt es: viejolesbiano

login.post('/', async(req, res, next) => {
    const {email, password} = req.body;
    const sql = `SELECT * FROM user WHERE email = '${email}' AND pass = '${password}';`;
    const rows = await db.query(sql);

    if(email && password){
        if(rows.length >= 1){
               const token = jwt.sign({
                    id:rows[0].id,
                    email: rows[0].email
               },"viejolesbiano");
               return res.status(200).json({code: 200, message: token});
        }else{
            return res.status(401).json({code: 401, message: "Usuario no encontrado"});
        }
    }else{
        return res.status(500).json({code:500, message: "Campos incompletos"});
    }
});

module.exports = login;