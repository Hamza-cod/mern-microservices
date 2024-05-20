const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const bodyParser = require('body-parser')
const cors  = require('cors')

dotenv.config();
const port = process.env.PORT
const app =  express()
const corstOptions = {
  credentials: true, // This is the important part to allow credentials,
  origin: 'http://localhost:5173',
}

app.use(cors(corstOptions));
app.use(express.json());

app.use('/api/users',cors(corstOptions),router)
app.use('/api/auth',cors(corstOptions),authRouter)
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
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});