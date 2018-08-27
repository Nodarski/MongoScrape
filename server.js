require('dotenv').config();
var parser = require('body-parser');
var express = require('express');
var handlebars  = require('express-handlebars');


var app = express();
var port = process.env.PORT || 3000;

app.engine('hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static('./public'));

app.use(parser.urlencoded({extended: true}));
app.use(parser.text());
app.use(parser.json());;

require('./controllers/controller.js')(app);

app.listen(port, () => {
    console.log(`Conencted. Port: ${port}`);
});

