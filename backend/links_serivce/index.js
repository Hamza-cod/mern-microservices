const express = require("express")
const dotenv = require('dotenv') ;
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require("mongoose");
const router = require("./routes/link.route");
dotenv.config()

const port = process.env.PORT
const corstOptions = {
  credentials: true, // This is the important part to allow credentials,
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}
const app = express();
app.use(cors(corstOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/links",router)
app.get("/api/",(req,res)=>{
  res.json({
      app:"mern microservices",
      service:"links",
    })
  })



mongoose.set('strictQuery',true)
mongoose.connect(process.env.DB_URI).then(()=>{
  console.log('db connected')
}).catch((err)=>{
  console.log(err);
})
app.listen(port , ()=>{
  console.log(" app runing on http://localhost:"+port);
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