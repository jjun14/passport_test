var mongoose = require('mongoose');
//create genericSchema
var ModelSchema = new mongoose.Schema({
//  name: String,
//  email: String,
//  password: String
});

mongoose.model('Model', ModelSchema);
