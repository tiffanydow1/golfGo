const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongo = require('mongodb');

require('dotenv').config();

const dbConnection = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.on('error', (err) => {
  console.error('Express app error:', err);
});

const playersRouter = require('./routes/players');
const GamesRouter = require('./routes/games');
const CoursesRouter = require('./routes/courses');

app.use('/api/players', playersRouter);
app.use('/api/players/add', playersRouter);
app.use('/api/players/login', playersRouter);
app.use('/api/players/:id', playersRouter);
app.use('/api/games', GamesRouter);
app.use('/api/games/add', GamesRouter);
app.use('/api/games/update', GamesRouter);
app.use('/api/courses', CoursesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
