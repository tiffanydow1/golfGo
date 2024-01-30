const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

SALT_WORK_FACTOR = 10;

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date, required: true
  },
  games: [{
    _id: Number,
    course_name: String,
    game_length: Number,
    date: Date,
    scorecard: [{
      _id: false,
      hole: Number,
      par: Number,
      score: Number,
    }],
  }],
});


// games = [
//   { course_name String, game_length Number, date Date, scorecard Array }
// ]

PlayerSchema.pre('save', function (next) {
  const player = this;

  // only hash the password if it has been modified (or is new)
  if (player.isModified('password') || player.isNew) {
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
      if (error) return next(error);

      // hash the password using our new salt
      bcrypt.hash(player.password, salt, function (error, hash) {
        if (error) return next(error);

        //override the cleartext password with the hashed one
        player.password = hash;
        next();
      })
    })
  } else {
    return next();
  }

  // // only hash the password if it has been modified (or is new)
  // if (!player.isModified('password')) return next();

  // // generate a salt
  // bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
  //   if (err) return next(err);

  //   // hash the password using our new salt
  //   bcrypt.hash(player.password, salt, function (err, hash) {
  //     if (err) return next(err);

  //     //override the cleartext password with the hashed one
  //     player.password = hash;
  //     next();
  //   });
  // });
});

PlayerSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Player', PlayerSchema);
