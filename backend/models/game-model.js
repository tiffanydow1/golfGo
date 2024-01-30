const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  player_id: { type: String, ref: 'Player', index: true, required: true },
  course_id: { type: Number, ref: 'Course', index: true, required: true },
  game_length: { type: Number, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  scorecard: { type: Array, required: true }
});

module.exports = mongoose.model('Game', GameSchema);
