var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.use(express.static(__dirname + '../public/'));

router.get('/history/:zipcode', function(req, res){
  db.messages.findAll({
    where: {
      zipcode: req.params.zipcode
    },
    include: [db.user]
  }).then(function(message){
      res.render('../views/chat/history', {results: message});
      console.log(results);
  });
});

module.exports = router;
