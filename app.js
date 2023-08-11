const express= require('express');
const bodyParser= require('body-parser');
const ejs= require('ejs');
const { con, Users } = require('./models/Users');
const { Port } = require('./config');

const app= express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
con();

app.get("/", function(req, res){
    res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/register", function(req,res){
    const newUser= new Users({
        email: req.body.username,
        password: req.body.password
    })
    newUser.save();

    res.render('secrets');
});

app.post("/login", function(req,res){
    const username= req.body.username;
    const password= req.body.password;

    Users.findOne({email: username})
        .then(function (founduser) {
            if(founduser){
                if(founduser.password === password){
                    res.render('secrets');
                }
            }
        })
        .catch(function (error) {
            console.log("Login Error")
            res.send(error);
            console.error("Error fetching tasks:", error);
        });

    res.render('secrets');
});

app.listen(process.env.Port, function(){
    console.log("Port: 3000");
});