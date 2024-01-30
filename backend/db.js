const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.ATLAS_URI) {
  console.error('ATLAS_URI not defined in environment variable.');
  process.exit(1);
}

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error', err);
});

module.exports = connection;
