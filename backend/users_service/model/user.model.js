const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    profilePicture: {
      type: String,
      default : ''
    },
    password: {
      type: String,
      required: true,
    }

}
,{
  tiemestamps : true
})
const User = mongoose.model('User', userSchema);

module.exports = User;
