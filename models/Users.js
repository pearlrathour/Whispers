const mongoose = require("mongoose");
// const encrypt= require('mongoose-encryption');
const passportLocalMongoose= require('passport-local-mongoose');
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

UserSchema.plugin(passportLocalMongoose);

// const secret= "Thisisourlittlesecret";
// UserSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const Users = mongoose.model("Users", UserSchema);

module.exports = {
    con,
    Users
};