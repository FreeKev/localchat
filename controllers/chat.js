var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res){
  console.log('Hello Chat!')
  res.send('home');
});


module.exports = router;
