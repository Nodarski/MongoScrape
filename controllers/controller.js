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

    app.get('/new-articles', async function (req, res) {

        await request('https://www.investopedia.com/news/', function (error, response, body) {
            // console.log(body)
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            const $ = cheerio.load(body);
            console.log($('.item').length);
            $('.item').each(function() {
                
                let postSumm = $(this).find('.item-description').text();
                let postTitle = $(this).find('.item-title', 'a').text();
                // let postLink =$(this).children('.item-title', 'a').attr('href');
                // let postImg = $(this).find('.item-image-src').attr("src");
                console.log(postSumm);
                console.log(postImg);
                console.log(postTitle)
                if($(this).find('.item-image-src').attr("src")){
                    var postImg = $(this).find('.item-image-src').attr("src")

                }
                else {
                    var postImg = 'http://lakefarmbeef.co.nz/wp-content/themes/lakefarm/img/noimage.png'


                }

                let article = {
                    title: postTitle,
                    summ: postSumm,
                    // URL: postLink,
                    imgUrl:postImg
                };

                let query = { title: postTitle };

                crypt.findOneAndUpdate(query, article, { upsert: true }, function(err) {
                    if (err) throw err;
                    console.log('Article accepted.');
                });
            });

    
    });

        res.json({ redirectURL: '/' });
    });
    

    app.delete('/clear-articles', function(req, res) {
        crypt.remove({}, function() {
            console.log('Cleared articles.');
            res.json({ redirectURL: '/' });
        });
    });

    app.put('/create-comment', function(req, res) {
        crypt.findOneAndUpdate(
            { _id: req.body.id }, 
            { $push: { notes: req.body.comment } },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        res.json({ redirectURL: '/' });
    });

    
    app.delete('/delete-comment', function(req, res) {
        crypt.findOneAndUpdate(
            { _id: req.body.id }, 
            { $pull: { notes: req.body.comment } },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        res.json({ redirectURL: '/' });
    });
 

    
}