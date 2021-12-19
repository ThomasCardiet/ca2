//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema
const identitySchema = new Schema({
    name : String,
    surname: String,
    age: Number,
    height: Number,
    origins: Array,
    isAuth: Boolean,
})
//defining the name of the constructor for our class
const Identity = mongoose.model('Identity', identitySchema);
//export the class, also called a model or a document, to use in different files
module.exports = Identity