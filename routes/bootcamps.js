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
} = require("../controllers/bootcamps");

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// export router
module.exports = router;
