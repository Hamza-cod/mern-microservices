const express = require('express');
const verifyToken = require('../middlewares/verifyUser');
const User = require('../model/user.model');
const router = express.Router();


router.get('/',(req,res)=>{
  res.json(
    {
      "app":"mern microservices",
      "service":"users",
    }
  )})

router.put('/update/:id',verifyToken , (req,res,next)=>{
  const {id} = req.params
  const user = User.findOne({id});
  res.json(user)
})

  
module.exports = router