// the business model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var businessSchema = new Schema({
	id: ObjectId,
	username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	phone: {type: String, required: true},
	name: {type: String, required: true},
	address: {type: String, required: true},
});

module.exports = mongoose.model('Business', businessSchema);