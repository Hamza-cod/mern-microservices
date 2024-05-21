
const express = require('express');
const { sigup, signin ,logout} = require('../controllers/auth.controller');
const router = express.Router()

router.post('/signup',sigup)
router.post('/signin',signin)
router.get('/logout',logout)
module.exports =  router;