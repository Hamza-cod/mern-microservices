const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT
const app =  express()
app.use(express.json());


mongoose.connect(process.env.DB_URI).then(()=>{
  console.log('db connected')
}).catch((err)=>{
  console.log(err);
})
app.listen(port,()=>{
  console.log("Users service starting on http://localhost:"+port)
})