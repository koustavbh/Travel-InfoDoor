var express = require("express")
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var passport = require('passport');
var seedDB = require('./seeds');
var User = require('./models/user');

var commentRoutes = require('./routes/comments'); 
var campgroundRoutes = require('./routes/campgrounds'); 
var indexRoutes = require('./routes/index'); 


//seedDB();

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.set('view engine','ejs')

app.use(require('express-session')({
    secret : 'Rusty is the best!!',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
//schema setup

/*Campground.create({
    name: 'Salmon Creek' ,
    image : 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    description: 'This dog is the best'
},function(err,campground){
    if(err){
        console.log(err);
    }else{
        console.log('Newly Created Campground: ');
        console.log(campground);
    }

});*/

/*var campgrounds = [
    {name: 'Salmon Creek' , image : 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb'},
    {name: 'Granite Hill' , image : 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?cs=srgb&dl=pexels-pixabay-210243.jpg&fm=jpg'},
    {name: 'Mountain Goat' , image : 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'},
    {name: 'Salmon Creek' , image : 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb'},
    {name: 'Granite Hill' , image : 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?cs=srgb&dl=pexels-pixabay-210243.jpg&fm=jpg'},
    {name: 'Mountain Goat' , image : 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'},
    {name: 'Salmon Creek' , image : 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb'},
    {name: 'Granite Hill' , image : 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?cs=srgb&dl=pexels-pixabay-210243.jpg&fm=jpg'},
    {name: 'Mountain Goat' , image : 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'}
]*/

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(5500,function(){
    console.log('server started');
});