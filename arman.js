const express = require('express');
const mongoose = require('mongoose');
const expresshb = require('express-handlebars');
const path = require('path');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const posts = require('./controllers/posts');
// const uri = "mongodb://localhost:27017/aUser";
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const handlebars = require('handlebars'); 
const uri = 'mongodb+srv://armancoding:<password>@armancoding.8vljh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then( console.log("mongoose is connected on port 4000"));
app.use('/public/', express.static(path.join(__dirname, '/public')));
const {forwardAuthenticated,ensureAuthenticated} = require('./config/auth');
// config
require('./config/passport')(passport);

/* body parser*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname,"/views"));
app.use(session({
    secret:"viruse",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge: 180 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
  next()
});



app.engine('handlebars', expresshb.create({
    handlebars: allowInsecurePrototypeAccess(handlebars),
      defaultLayout: 'main',
      layoutsDir: app.get('views') + '/layouts',
      partialsDir: [app.get('views') + '/partials'],
  }).engine);
  app.set('view engine', 'handlebars');

  app.get('/',(req,res)=>{
    res.redirect('/public/port.html');
});
app.get('/register',forwardAuthenticated, (req,res) =>{
    res.render('register');
})

app.get('/login',forwardAuthenticated, (req,res) =>{
    res.render('login');
});
app.get('/user/profile',ensureAuthenticated, (req,res) =>{
    res.render('profile', {user: req.user});
})
app.post('/user/register', posts.register);
app.post('/user/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.post('/contact', posts.contact);

app.listen(PORT, console.log('arman site is on air'));