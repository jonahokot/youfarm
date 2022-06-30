const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
//configure environment
require("dotenv").config();

//expres session section
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

//routing section
//const homeroutes = require("./routes/homeroutes");
const registerroutes = require("./routes/registerroutes");
//const loginRoutes = require("./routes/loginroutes");
//const userRoutes = require("./routes/userroutes");
//const Userlogin = require("./models/Userlogin")

//models section
const config = require("./config/database");

//server initialisation
const server = express();

//mongoose setup
//connecting to mongoose db
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
//checking mongodb connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});
//checking for connection errors
db.on('error', function (err) {
    console.error(err);
    });

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: true }));
server.use(expressSession);     

//set view engine
server.set("view engine", "pug");
server.set("views", "./views");

//setting routes
server.use('/register', registerroutes)

//section for handling non existent routes
    server.get('*', (req, res) => {
    res.status(404).send('OOPS! WRONG ADDRESS');
    });
    
// server
    server.listen(3002, () => console.log('Listening on Port 3002')); 

