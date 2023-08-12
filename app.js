const express= require('express');
const bodyParser= require('body-parser');
const ejs= require('ejs');
const { con, Users } = require('./models/Users');
// const md5= require("md5");
// const bcrypt= require("bcrypt");
const { Port } = require('./config');
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('passport-local');
const { default: mongoose } = require('mongoose');
// const saltRounds= 10;

const app= express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "Our Lil secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

con();

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.get("/", function(req, res){
    res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/secrets", function(req, res){
    if(req.isAuthenticated){
        res.render("secrets");
    }
    else{
        res.redirect("/login");
    }
    
});

app.get("/logout", function(req,res){
    res.logout();
    res.redirect("/");
})

app.post("/register", function(req,res){
    // const newUser= new Users({
    //     email: req.body.username,
    //     password: md5(req.body.password)
    // })
    // newUser.save();

    // const hash=bcrypt.hashSync(req.body.password, saltRounds);
    // const newUser= new Users({
    //     email: req.body.username,
    //     password: hash
    // });
    // newUser.save();

    Users.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
    
    // res.render('secrets');
});

app.post("/login", function(req,res){
    // const username= req.body.username;
    // // const password= md5(req.body.password);
    // const password= req.body.password;

    // Users.findOne({email: username})
    //     .then(function (founduser) {
    //         if(founduser){
    //             // if(bcrypt.compareSync(password, founduser.password) === true)
    //             //     res.render("secrets");
    //             // else
    //             //     console.log("Wrong passwrod")
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log("Login Error")
    //         res.send(error);
    //         console.error("Error fetching tasks:", error);
    //     });

    if(req.isAuthenticated){
        res.redirect("/secrets");
    }
    else{
        res.redirect("/login");
    }
});

app.listen(process.env.Port, function(){
    console.log("Port: 3000");
});