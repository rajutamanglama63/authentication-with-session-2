const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")

const staticRoutes = require("./routes/staticRoutes");
const dynamicRoutes = require("./routes/dynamicRoutes");
const databaseConnection = require("./config/db");
const { urlencoded } = require("express");
const { ensureAuthentication } = require("./config/auth");

const app = express();

// Passport Config
require('./config/passport')(passport);

dotenv.config();
const Port = process.env.PORT || 6000;


// connecting db
databaseConnection();

// body-parser middleware
app.use(express.urlencoded({extended:true}));

// setting view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// embedding assets files
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));


// express-session middleware
app.use(
    session({
        secret: "key that will sign cookie",
        resave: false,
        saveUninitialized: false
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// static routes
app.use('/', staticRoutes);

// dynamic routes
app.use('/users', dynamicRoutes);

app.listen(Port, () => {
    console.log(`Server running on Port http://localhost:${Port}`);
});