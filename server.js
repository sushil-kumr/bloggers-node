const express = require("express");
const connectDB = require('./config/db')

const cors = require("cors");

const app = express();

//Connect DB
connectDB();


// Init Middleware
app.use(express.json({extended:false}));

// app.use(cors);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// define routes

app.get('/',(req,res)=> res.send("We Running this fucking server"));

app.use('/api/article',require('./api/article'))
app.use('/api/payment',require('./api/payment'))

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
