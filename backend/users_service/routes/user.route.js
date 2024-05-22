const express = require('express');
const verifyToken = require('../middlewares/verifyUser');
const User = require('../model/user.model');
const  router = express.Router();


router.get('/',(req,res)=>{
  res.json(
    {
      "app":"mern microservices",
      "service":"users",
    }
  )})

router.get('/me/',verifyToken , (req,res,next)=>{
  res.json(req.user)
})

  
module.exports = router