const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	title: String
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = { ToDo };
