
const express = require('express');
const { sigup } = require('../controllers/auth.controller');
const router = express.Router()

router.post('/signup',sigup)
module.exports =  router;