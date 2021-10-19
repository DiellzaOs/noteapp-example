const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    
    name:{
      type:String,
      required: [true, 'username cannot be blank']
    },
    username:{
      type:String,
      required: [true, 'username cannot be blank']
    },
    email:{
      type:String,
      required:[true, 'email cannot be blank'],
      unique: true
    },
    password:{
      type: String,
      required:[true, 'password cannot be blank']
    }
    
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);
