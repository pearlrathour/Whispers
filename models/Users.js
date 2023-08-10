const mongoose = require("mongoose");
const {endpoint} = require('../config');

const DB_URL = process.env.DB_URL;

function con() { 
    mongoose.connect(DB_URL).then(() => {
        console.log("Conn succ");
    }).catch((err) => console.log("No conn", err));
}

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const Users = mongoose.model("Users", UserSchema);

module.exports = {
    con,
    Users
};