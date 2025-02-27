const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

let UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

let UserModel =  mongoose.model('users',UserSchema);


module.exports = UserModel;
