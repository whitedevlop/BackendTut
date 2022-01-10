const express = require("express");

const { getCourse } = require('../controllers/courses');
const router = express.Router();
router.route('/').get(getCourses);

module.exports = router; 
