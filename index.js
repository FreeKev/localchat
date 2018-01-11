require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var db = require('./models');
var app = express();
var socket = require('socket.io');//require socket.io

app.use(express.static('public'));

// server.listen(80);
var server = app.listen(process.env.PORT || 3000);

var io = socket(server);

io.sockets.on('connection', function (socket) { // We are given a websocket object in our function
  console.log("We have a new client: " + socket.id);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    // io.emit('chat message', msg, zip);
    //create a message in the message table
    // db.messages.create({
    //   userId: req.user.id,
    //   messageText: msg,
    //   zipcode: zip
    // }).then()
  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected");
  });

}); //ending

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
// Session above flash & passport bcs they use it
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
})

app.get('/', function(req, res){
  // res.send('home page coming soon');
  res.render('home');

});

app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile');
  //Add DELETE ROUTE TO PROFILE
  db.user.findAll().then(printU => {
    console.log(printU.zipcode);
  });
});

app.use('/auth', require('./controllers/auth'));
// app.use('/chat', require('./controllers/chat'));
