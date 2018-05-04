// Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models');


//sequelize connection
var sequelizeConnection = models.sequelize;

// Sync
sequelizeConnection.sync();


// Routes
router.get('/', function (req, res) {
  res.redirect('/index');
});

router.get('/index', function (req, res) {
  models.burgers.findAll({
   include: [{model: models.devourers}]
  }).then(function(data){
    var hbsObject = { burgers: data };
    res.render('index', hbsObject);
  })
});

router.post('/burger/create', function (req, res) {
  models.burgers.create(
    {
      burger_name: req.body.burger_name,
      devoured: false
    }
  ).then(function(){
    res.redirect('/index');
  });

});



// Devour a Burger
router.post('/burger/eat/:id', function (req, res) {

  // If not name was added, make it "Anonymous"
  if(req.body.burgerEater == "" || req.body.burgerEater == null){
    req.body.burgerEater = "Anonymous";
  }

  // Create a new burger devourer (and also associate it to the eaten burger's id)
  models.devourers.create({
    devourer_name: req.body.burgerEater,
    burgerId: req.params.id
  })

  // Then, select the eaten burger by it's id
  .then(function(newDevourer){

    models.burgers.findOne( {where: {id: req.params.id} } )

    // Then, use the returned burger object to...
    .then(function(eatenBurger){
      // ... Update the burger's status to devoured
      eatenBurger.update({
        devoured: true,
      })

      // Then, the burger is devoured, so refresh the page
      .then(function(){
        res.redirect('/index');
      });

    });

  });

});

// ----------------------------------------------------


// Export routes
module.exports = router;