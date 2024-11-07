//EXPRESS ---------------------------------------------------------------------
const express = require('express');
const app = express();

//DEPENDECIAS -----------------------------------------------------------------
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //Makes sure the json are actually readable
const cors = require('./middleware/cors');
app.use(cors);


//ROUTES ----------------------------------------------------------------------
const user = require('./routes/userMethods');
const login = require('./routes/loginMethods');

//METHODS ---------------------------------------------------------------------

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Hello,World');
});
app.use("/login", login);
app.use((req, res, next) => { //auth
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "viejolesbiano");
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({code: 401, message: "Access denied"})
    }
})
app.use("/user",user);

app.listen(3000, () => {
    console.log('Server is running...');
});