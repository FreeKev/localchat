var express = require('express');
var passport = require('../config/passportConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var router = express.Router();

router.use(express.static(__dirname + '../public/'));

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'Login Successful',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/signup', function(req, res, next){
  console.log('req.body is', req.body);
  db.chatroom.findOrCreate({
    where: { zipcode: req.body.zipcode },
    defaults: {
      chatname: req.body.place
    }
  }).spread(function(room, wasCreated){
    if(wasCreated){
      console.log('sucess room');
    } else {
      console.log('no room');
    }
  }).catch(function(err){
    req.flash('error', err.message);
    res.redirect('auth/signup');
  })

  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      zipcode: req.body.zipcode
    }
  }).spread(function(user, wasCreated){
    if(wasCreated){
      passport.authenticate('local', {
        successRedirect: '/profile',
        successFlash: 'Successfully logged in'
      })(req, res, next);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/login');
    }
  }).catch(function(err){
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  })
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/callback/facebook', passport.authenticate('facebook', {
  successRedirect: '/profile',
  successFlash: "You successfully logged in via Facebook",
  failureRedirect: '/auth/login',
  failureFlash: 'You tried to login with Facebook, but he doesn\'t recognize you'
}));

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/');
});

router.get('/:id', function(req, res){
  db.user.findOne({
    where: {id: req.params.id}
  }).then(function(user){
    res.render('auth/single', { result: user });
  });
});

router.delete('/:id', isLoggedIn, function(req, res){
  console.log('Delete route. Id = ', req.params.id);
  res.send('Delete Route Working');
  db.user.destroy({
    where: {id: req.params.id}
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('successful'); //successFlash ??
    req.flash('success', 'User Deleted');
  }).catch(function(err){
    console.log('Error occured', err);
    res.send('fail');
  })
})

router.put('/edit', isLoggedIn, function(req, res){
  console.log('Update Route. Id = ', req.user.id);
  console.log(req.body);
  db.user.update({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      zipcode: req.body.zipcode
      }, {
        where: {
          id: req.user.id
        }
  }).then(function(user){
    req.flash('success', 'User Updated');
    res.send('success');
  }).catch(function(err){
    console.log('Error occured', err);
    res.send('fail');
  });
});

module.exports = router;
