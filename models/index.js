var mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

module.exports = () => {
    mongoose.connect(MONGODB_URI);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function() {
        console.log('Connected to db.');
    });

}