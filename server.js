const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = require('./server/routes/api');
const port = 3000;
const app = express();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Passport Google Package
var session = require('express-session'); // Import Express Session Package
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom secret to use with JWT

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());
app.use('/api', api);
app.use('/auth/google', passport);

  app.get('/', function(req, res){
    res.send('Hello from server');
  });

  app.post('/auth/google', function(req, res){
    // res.render('');
    res.send('dd');
  });

  app.get('/index', function(req, res){
    res.send('ddsadfasdfasdf');
  });
  
  app.post('/index', function(){
      res.send('I am success');
  })

  app.listen(port, function(){
    console.log("Server is run" + port);
  });

   // Start Passport Configuration Settings
   app.use(passport.initialize());
   app.use(passport.session());
   app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
   // End Passport Configuration Settings

   // Serialize users once logged in   
   passport.serializeUser(function(user, done) {
       // Check if the user has an active account
       if (user.active) {
           // Check if user's social media account has an error
           if (user.error) {
               token = 'unconfirmed/error'; // Set url to different error page
           } else {
               token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user token
           }
       } else {
           token = 'inactive/error'; // If account not active, provide invalid token for use in redirecting later
       }
       done(null, user.id);
   });

   // Google Strategy
   passport.use(new GoogleStrategy({
           clientID: '813101555267-3d2molmesrv23pe2q155nd2uh02k08ls.apps.googleusercontent.com', // Replace with your Google Developer App client ID
           clientSecret: '1E9gWHKviWf_-dTSLXLsAPDZ', // Replace with your Google Developer App client ID
           callbackURL: "http://localhost:3000/index" // Replace with your Google Developer App callback URL
       },
       function(accessToken, refreshToken, profile, done) {
           User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
               if (err) done(err);

               if (user && user !== null) {
                   done(null, user);
               } else {
                   done(err);
               }
           });
       }
   ));

   // Google Routes
   app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));
   app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }), function(req, res) {
       res.redirect('/google/' + token); // Redirect user with newly assigned token
   });
