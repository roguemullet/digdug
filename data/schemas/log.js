var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    src_ip: String,
    src_app: String,
    entry: String,
    port: Number
})

module.exports = LogSchema;
