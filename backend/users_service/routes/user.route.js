const express = require('express');
const verifyToken = require('../middlewares/verifyUser');
const { updateUser } = require('../controllers/user.controller');
const multer = require('multer');
const User = require('../model/user.model');
const  router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/',(req,res)=>{
  res.json(
    {
      "app":"mern microservices",
      "service":"users",
    }
  )})
router.get('/me/',verifyToken ,async (req,res)=>{
  const user = await User.findById(req.user.id)
  if(user){
const {password,...rest} = user
  // console.log(user,req.user)
  res.json({user :rest._doc})
  }
router.get('/:username/',async (req,res)=>{

  const user = await User.findOne({username : req.params.username}).select('username description profilePicture')
  if(user){
const {password,...rest} = user
  // console.log(user,req.user)
  return res.json({user :rest._doc})
  }
  return res.status(404).json({message:"not found"})
  })


  
})
router.post('/:id',verifyToken,upload.single('image'),updateUser)

  
module.exports = router