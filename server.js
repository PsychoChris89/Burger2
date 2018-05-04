// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Set up Express
var app = express();

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var router = require('./controllers/burgers_controllers.js');
app.use('/', router);

// Open Server
var port = process.env.PORT || 8989;
app.listen(port, function(e){

});