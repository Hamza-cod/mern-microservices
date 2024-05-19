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
    password: {
      type: String,
      required: true,
    }

}
,{
  tiemestamps : true
})
const User = mongoose.model('User', userSchema);

export default User;
