const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
  res.json(
    {
      "app":"mern microservices",
      "service":"users",
    }
  )})

  
module.exports = router