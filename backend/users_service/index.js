const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
dotenv.config();
const port = process.env.PORT
const app =  express()
app.use(express.json());

app.use('/api/users',router)
app.use('/api/auth',authRouter)
// create the db if note exists
mongoose.set('strictQuery',true)
mongoose.connect(process.env.DB_URI).then(()=>{
  console.log('db connected')
}).catch((err)=>{
  console.log(err);
})
app.listen(port,()=>{
  console.log("Users service starting on http://localhost:"+port ,process.env.DB_URI)
})