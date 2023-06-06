const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connectDB = require('./server/database/connection');

// requiring a model
const Userdb = require('./server/model/model');

const app = express();

// Requiring user route
const myRoutes = require('./server/routes/router');

dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080

// Middleware for session
app.use(session({
    secret : 'Simple HR Management System',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField : 'employeeid'}, Userdb.authenticate()));
passport.serializeUser(Userdb.serializeUser());
passport.deserializeUser(Userdb.deserializeUser());

// Log request
app.use(morgan('tiny'));

// Middleware for flash messages
app.use(flash());

// Setting the middleware globally
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    res.locals.error = req.flash(('error')); // Login error
    res.locals.currentUser = req.user; // To see only the authenticated user can access some features.
    next();
})

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended : true}));
// set template engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(myRoutes);

// load assets
app.use(express.static(path.join(__dirname, 'assets')));

app.listen(PORT, () => {
    console.log(`Server successfully running on port: http://localhost:${PORT}`)
})

