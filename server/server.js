const express = require('express');
const cors = require('cors') //allows different port communicate
const morgan = require('morgan')

/*
lecture used import express from 'express'
this is vanilla way of importing external lib. but
nodejs gives us the option of using require(). simpler

Otherwise, gotta add "type":"module" in package.json
*/

const app = express();

//middleware
//express.json() handles incoming data in the form of JSON
//prepare it in req.body for server to work with.
//otherwise would get undefined 
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
    res.send("Server is up! This is home page!")
})

app.get('/api', (req, res) => {
    res.json({
        data: 'hello from nodejs api',
    })
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})