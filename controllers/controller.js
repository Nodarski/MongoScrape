require('../models/index')();
var crypt = require('../models/news');
const request = require('request');
const cheerio = require('cheerio');

module.exports = function(app) {

    console.log('hello');
    
    app.get('/', function(req, res) {
        
        crypt.find(function(err, data) {
            console.log('Successfully returned all articles.');
            res.render('home', { articles: data });
        });
    });

    

    
}