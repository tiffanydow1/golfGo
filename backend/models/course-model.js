const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  _id: { type: Number, required: true },
  course_name: { type: String, required: true },
  location: { type: String, required: true },
  par: { type: Array, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
