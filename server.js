require('dotenv').config()
const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true })
const db = mongoose.connection
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())
app.use('/subscribers', subscribersRouter)


app.listen(8080, function(){
    console.log('Server started');
});