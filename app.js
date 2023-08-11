const express= require('express');
const bodyParser= require('body-parser');
const ejs= require('ejs');
const { con, Users } = require('./models/Users');
// const md5= require("md5");
const bcrypt= require("bcrypt");
const { Port } = require('./config');
const saltRounds= 10;

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
    // const newUser= new Users({
    //     email: req.body.username,
    //     password: md5(req.body.password)
    // })
    // newUser.save();

    const hash=bcrypt.hashSync(req.body.password, saltRounds);
    const newUser= new Users({
        email: req.body.username,
        password: hash
    });
    newUser.save();
    
    res.render('secrets');
});

app.post("/login", function(req,res){
    const username= req.body.username;
    // const password= md5(req.body.password);
    const password= req.body.password;

    Users.findOne({email: username})
        .then(function (founduser) {
            if(founduser){
                if(bcrypt.compareSync(password, founduser.password) === true)
                    res.render("secrets");
                else
                    console.log("Wrong passwrod")
            }
        })
        .catch(function (error) {
            console.log("Login Error")
            res.send(error);
            console.error("Error fetching tasks:", error);
        });
});

app.listen(process.env.Port, function(){
    console.log("Port: 3000");
});