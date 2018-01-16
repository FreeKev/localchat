var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.use(express.static(__dirname + '../public/'));

router.get('/history/:zipcode', function(req, res){
  // res.render('../views/chat/history');
  db.messages.findAll({
    where: {
      zipcode: req.params.zipcode
    }
    // include: [db.user, db.chatroom]
    // Not working - needs associations (error -> user is not associated to messages!)
    // include: [db.messages, db.chatroom]
    // Not working (swiched to db.user.findAll) - messages is not associated to user!
  }).then(function(message){
      res.render('../views/chat/history', {results: message});
      console.log(results);
  });
});

module.exports = router;
