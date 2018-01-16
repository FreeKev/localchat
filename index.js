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

// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

// server.listen(80);
var server = app.listen(process.env.PORT || 3000);

var io = socket(server);

io.sockets.on('connection', function (socket) { // We are given a websocket object in our function
  console.log("We have a new client: " + socket.id);

  socket.on('create', function(room) {
    socket.join(room);
  });

  socket.on('package', function(message){
    console.log(message);
    // We have a new client: wpmPX_L_ulGozp2YAAAD
    // { id: 6, zip: 98101, text: 'asdf' }
    db.messages.create({
      userId: message.id,
      zipcode: message.zip,
      messageText: message.text
    }).then(function(data){
      // you can now access the newly created task via the variable data
      // console.log(data);
      io.sockets.in(message.zip).emit('chat message', message.text);
    });
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
  res.render('home');
});

app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile');
  db.user.findAll().then(printU => {
    console.log(printU.zipcode);
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/chat', require('./controllers/chat'));
