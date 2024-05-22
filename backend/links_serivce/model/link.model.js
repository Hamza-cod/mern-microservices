const mongoose = require("mongoose")

const linkSchema = mongoose.Schema({
  title :{
    type:String,
    required : true
  },
  description :{
    type:String,
    required : true
  },
  url :{
    type:String,
    required : true
  },
  image :{
    type:String,
    required : true,
    default : '/uploads/default_image.png'
  },
  creator :{
    type:Object,
    required : true,
  },
},{
  tiemestamps : true,
})

const linkModel = mongoose.model('Link',linkSchema);
module.exports = linkModel;