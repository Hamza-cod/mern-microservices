const express =  require('express');
const linkModel = require('../model/link.model');
const { getLinks, createLink, updateLink, deleteLink } = require('../controllers/link.controller');
const router = express.Router()

router.get('/',getLinks)
router.post('/',createLink)
router.put('/:id',updateLink)
router.delete('/:id',deleteLink)


module.exports =  router