const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    phone:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    date:{type:Date, defalt:Date.now}
});


module.exports = mongoose.model('aUser', UserSchema);