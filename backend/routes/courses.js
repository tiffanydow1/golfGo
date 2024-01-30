const router = require('express').Router();
let { ObjectId } = require('mongodb');

let Course = require('../models/course-model');

// GET ALL COURSES
router.route('/').get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(error => res.status(400).json('Error: ' + error));
})

module.exports = router;
