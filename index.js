const express = require('express');
const app = express();

//npm install morgan --save
//npm install -g nodemon
//npm install mysql --save
const morgan = require('morgan');
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Hello,World');
});

app.listen(3000, () => {
    console.log('Server is running...');
});