
const jwt = require('jsonwebtoken')
const User = require('./../model/user.model');
const bcrypt =  require('bcryptjs');
const errorHandler = require('../utils/error');


const sigup = async (req,res,next)=>{
  const {password,email,username} = req.body
  if (!username || !password || !email) {
    return res.status(422).json({ message: 'All fields are required' });
  }
  const userFond = await User.findOne({email})
  // console.log(userFond)
  if(userFond){
      return res.status(422).json({ message: 'email already taken' });
  }else{
    const userFond = await User.findOne({username})
    if(userFond)
      {
        return res.status(422).json({ message: 'username already taken' });
      }
  }
  // res.json(req.body);
  const hashedPassword = bcrypt.hashSync(password,10)
  try {
    
    const user = await User.create({password : hashedPassword,email,username})
    res.json(user)
  } catch (error) {
    next(error)
  }
}


const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log()
  try {
    const validUser = await User.findOne({$or: [
        { email },
        { username: email }
      ]});
      // console.log(validUser)
    // res.json(validUser)

    if (!validUser) return next(errorHandler(404, 'Username or Email unvalid'));
    
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({user :rest , access_token : token});
  } catch (error) {
    next(error);
  }
};

const logout = async (req,res)=>{
  res.clearCookie('access_token').status(200).json('Signout success!');
}



module.exports = {
  sigup,
  signin,
  logout
}