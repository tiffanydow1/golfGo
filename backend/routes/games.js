const router = require('express').Router();

let Game = require('../models/game-model');

// ADD A NEW GAME
router.route('/add').post(async (req, res) => {
  const { course, player_id, game_length, date } = req.body;

  const gameData = new Game({
    course_id: course.id,
    name: course.name,
    location: course.location,
    player_id,
    game_length,
    date,
  });

  try {
    // Save the new game
    const newGame = await gameData.save();

    // Send the new game data as the response
    res.json(newGame);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// UPDATE AN EXISTING GAME
router.route('/update').post(async (req, res) => {
  const { gameId, score } = req.body;

  try {
    const filter = { _id: gameId };

    const updateScore = {
      $push: { scorecard: { $each: score } }
    };

    const updatedGame = await Game.findOneAndUpdate(filter, updateScore, { new: true });

    // Send the updated game data as the response
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
