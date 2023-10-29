const express = require('express');
const cors = require('cors') //allows different port communicate
const morgan = require('morgan')

//need to deconstruct it, otherwise DATABASE is
//importing the entire config.js 
//that's way mongoose was complaining it did not got url
const { DATABASE } = require('./config.js')


const mongoose = require('mongoose')
/*
lecture used import express from 'express'
this is vanilla way of importing external lib. but
nodejs gives us the option of using require(). simpler

Otherwise, gotta add "type":"module" in package.json
*/


//start up express server
const app = express();


//Database
console.log(DATABASE.DATABASE)
mongoose.connect(DATABASE)
    .then(() => { console.log("database is connected!!") })
    .catch((err) => { console.log(err) })

//middleware --> app.use()
//express.json() handles incoming data in the form of JSON
//prepare it in req.body for server to work with.
//otherwise would get undefined 
app.use(express.json())

//morgan helps dev by auto generating request details,
//response time, status code, route in terminal
app.use(morgan('dev'))
const corsOptions = {
    origin: 'http://localhost:3000', // This should be the port React is using
};
app.use(cors(corsOptions));

//router
/*
    How to manage routes seperately?
    1. Create routes file, where all routes file goes
    2. in route file, require express
    3. route = express.Route()
    4. route.get() / route.post()
    5. in server.js, require the router file, give it a name
    6. app.use('/pre-fix', router file)
*/
const authRoute = require('./routes/auth')
app.use('/api', authRoute)


app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})

//also add a app.get() that catches all invalid url