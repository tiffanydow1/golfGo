const router = require('express').Router();
let { ObjectId } = require('mongodb');

let Player = require('../models/player-model');

// GET ALL PLAYERS
router.route('/').get(async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ADD A NEW PLAYER
router.route('/add').post(async (req, res) => {
  const { username, email, password } = req.body;
  const date_created = Date.now();

  const newPlayer = new Player({
    username,
    email,
    password,
    date_created,
  });

  try {
    // Save the new player
    const newUser = await newPlayer.save();

    // Send the new user data as the response
    res.json(newUser);
  } catch (error) {
    res.status(400).json('Error: ' + error.message);
  }
})

// LOGIN - EXISTING PLAYER
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const player = await Player.findOne({ $or: [{ email }, { username: email }] });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    player.comparePassword(password, (error, isMatch) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json(player);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET A SPECIFIC PLAYER
router.route('/:id').get((req, res) => {
  const id = req.params.id;
  const userId = new Object(id);

  Player.findOne({ _id: userId })
    .then(player => res.json(player))
    .catch(error => res.status(400).json('Error: ' + error));
})

// GET ALL GAMES ASSOCIATED WITH A SPECIFIC PLAYER
router.route('/:id/games').get((req, res) => {
  const id = req.params.id;
  const userId = new ObjectId(id);

  Player.findOne({ "_id": userId }, { games: 1, _id: 0 })
    .then((games) => res.json(games))
  // .catch(error => res.status(400).json('Error: ' + error));
})

module.exports = router;
