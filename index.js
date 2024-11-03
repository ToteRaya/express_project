//EXPRESS ---------------------------------------------------------------------
const express = require('express');
const app = express();

//DEPENDECIAS -----------------------------------------------------------------
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //Makes sure the json are actually readable


//ROUTES ----------------------------------------------------------------------
const user = require('./routes/userMethods');

//METHODS ---------------------------------------------------------------------
app.use("/user",user);
app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Hello,World');
});
 
app.listen(3000, () => {
    console.log('Server is running...');
});