const User = require("../model/user.model");
const errorHandler = require("../utils/error");
const bcryptjs =  require('bcryptjs');
const fs = require("fs")
const updateUser = async (req,res,next)=>{
  let {password,email,username,image,description} = req.body
  const {id} = req.params
  console.log(req.file)
  // get 
  // const {email:mailUser,username:nameUser} =  await User.find({email:email})
  const user =  await User.findOne({email})
  const mailUser = user.email;
  const nameUser = user.username;
  if (req.user.id !== req.params.id) {
   return next(errorHandler(401, 'You can update only your account!'));
 }
 if ( !email || !description) {
   return res.status(422).json({ message: 'All fields are required' });
 }
  let newPath = null
    if(req.file){
      const {originalname,path} = req.file
      const parts = originalname?.split('.')
      const ext = parts[parts?.length -1]
       newPath = path
      fs.renameSync(path,newPath);
    }

  const userFond = await User.findOne({email})
  if(userFond && mailUser!==email){
      return res.status(422).json({ message: 'email already taken' });
  }
    const userFondByuserName = await User.findOne({username})
    if(userFondByuserName && username!== nameUser)
      {
        return res.status(422).json({ message: 'username already taken' });
      }
  if (password) {
      password = bcryptjs.hashSync(password, 10);
    }
    try{
  const updatedUser = await User.findByIdAndUpdate(id,
      {
        $set: {
          username,
          email,
          password,
          description,
          profilePicture: newPath || image,
        },
      },
      { new: true }
    );
    const { password:pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
    }
    catch(error){
      next(error)
    }
  
}


 const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

 }

module.exports = {
  updateUser,
  deleteUser
}