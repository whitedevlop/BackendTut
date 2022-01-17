const express = require("express");

// Using Destructuring "{ }" in  order to link with bootcamps.js of "Controllers"
// Destructuring is a convenient way of extracting multiple values from data stored in (possibly nested) objects and Arrays.
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp =require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults'); 

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

const {protect} = require('../middleware/auth');

// Re-route other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
.route("/")
.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
.post(protect, createBootcamp);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

// export router
module.exports = router;
