const linkModel = require("../model/link.model")
const fs = require('fs');
const getLinks = async (req,res)=>{
  const {username} = req.params
  if(!createLink){
    res.status(404).json({message :"not found"})
  }
  const links = await linkModel.find({"creator.username": username})
  res.json(links)
}

const getLink = async (req,res)=>{
  const {id} = req.params
  const link = await linkModel.findById(id)
  res.json(link)
}


const createLink = async (req,res,next)=>{
  const {url,description,title} = req.body
  // res.json(req.body)
  const {originalname,path} = req.file
  const parts = originalname?.split('.')
  const ext = parts[parts?.length -1]
  const newPath = path+'.'+ext
  fs.renameSync(path,newPath);

  if ( !url || !description || !title){
    res.status(422).json({message : "All fields required"})
  }
  try {
    const link = await linkModel.create({url,description,title,image : newPath, creator : req.user})
    res.json({message : "link created seccuess fully",link})
  } catch (error) {
    next(error)
  }
  
}
const updateLink = async (req,res,next)=>{
  const {url,description,title,image} = req.body
  const {id} = req.params
  const validLink = await linkModel.findById(id);
  if(!validLink) {
    res.status(404).json({message :"link not nound"})
    }
  if ( !url|| !description|| !title){
    res.status(422).json({message : "All fields required"})
  }
  try{
    const link = await linkModel.findByIdAndUpdate(id,{url,description,title,image})
    res.json({message : "link updated seccuess fully"})
  }catch (err){
    next(err)
  }
}


const deleteLink = async(req,res,next)=>{
  const {id} = req.params
  const validLink = await linkModel.findById(id);
  if(!validLink) {
    res.status(404).json({message :"link not nound"})
  }
  try {
    await linkModel.findByIdAndDelete(id);
    res.json({message :"link deleted"})
  }catch(err){
    next(err)
  }
}

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink
}