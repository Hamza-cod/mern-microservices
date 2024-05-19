const User = require('./../model/user.model');
const bcrypt =  require('bcryptjs')
const sigup = async (req,res)=>{
  const {password,email,username} = req.body
  const hashedPassword = bcrypt.hashSync(password,10)
  try {
    
    const user = await User.create({password : hashedPassword,email,username})
    res.json(user)
  } catch (error) {
    res.json(error)
  }
}
module.exports = {
  sigup,
}