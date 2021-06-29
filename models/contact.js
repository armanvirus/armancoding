const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema = schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    message:{type:String, required:true},
    time:{type:Date}
});


module.exports = mongoose.model('Contact', contactSchema);