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
var socket = require('socket.io');

app.use(express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT || 3000);

var io = socket(server);

io.sockets.on('connection', function (socket) {
  console.log("We have a new client: " + socket.id);

  socket.on('create', function(room) {
    socket.join(room);
  });

  socket.on('package', function(message){
    console.log(message);
    db.messages.create({
      userId: message.id,
      zipcode: message.zip,
      messageText: message.text
    }).then(function(data){
      io.sockets.in(message.zip).emit('chat message', message.text);
    });
  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected");
  });

});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
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
