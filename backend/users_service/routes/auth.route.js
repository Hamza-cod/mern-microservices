
const express = require('express');
const { sigup, signin } = require('../controllers/auth.controller');
const router = express.Router()

router.post('/signup',sigup)
router.post('/signin',signin)
module.exports =  router;