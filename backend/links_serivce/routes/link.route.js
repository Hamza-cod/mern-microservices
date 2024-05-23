const express =  require('express');

const multer =require('multer');
// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const { getLinks, createLink, updateLink, deleteLink } = require('../controllers/link.controller');
const verifyToken = require('../middlewares/verifyUser');
const router = express.Router()

router.get('/:username',getLinks)
router.post('/',upload.single('image'),verifyToken,createLink)
router.put('/:id',upload.single('image'),verifyToken,updateLink)
router.delete('/:id',verifyToken,deleteLink)


module.exports =  router