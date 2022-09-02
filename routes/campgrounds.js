var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleWare = require('../middleware');


router.get('/campgrounds',function(req, res){
    console.log(req.user);
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index',{campgrounds:allCampgrounds});

        }
    });
    
});


//create route
router.post('/campgrounds',middleWare.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image,description: desc,author: author}
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/campgrounds');
 
        }

    });
    

});

//show form to new campground
router.get('/campgrounds/new',middleWare.isLoggedIn,function(req,res){
    res.render('campgrounds/new');
 
});

//show route
router.get('/campgrounds/:id',function(req,res){
    Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            
            res.render('campgrounds/show',{campground: foundCampground});

        }
    });
    
});

router.get('/campgrounds/:id/edit',middleWare.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render('campgrounds/edit', {campground: foundCampground});
        });
    
    
});

router.put('/campgrounds/:id',middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        }       else {
            res.redirect('/campgrounds/' + req.params.id );
        } 
    });
});

//destroy route
router.delete('/campgrounds/:id',middleWare.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

/*function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect('back');
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    res.redirect('back');
                }
               
    
            }
        });
    } else {
        res.redirect('back');
    }
    


}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}*/

module.exports = router;