const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cryptoSchema = new Schema({
    id: ObjectId,
    title: String,
    summ: String,
    URL: String,
    notes: Array
});

var crypt = mongoose.model('News', cryptoSchema);

module.exports = crypt;

