const passport = require("passport");
const { adminController } = require("../controllers");
const router = require("express").Router();

router.get(
  "/dashboard",
  passport.checkAuthentication,
  adminController.adminDashboard
);
router.get(
  "/add-employee",
  passport.checkAuthentication,
  adminController.addEmployee
);
router.get(
  "/all-reviews",
  passport.checkAuthentication,
  adminController.allReviews
);
router.get(
  "/edit-employee/:empID",
  passport.checkAuthentication,
  adminController.editEmployee
);
router.post(
  "/edit-employee/:empID",
  passport.checkAuthentication,
  adminController.saveEditedEmployee
);
router.post(
  "/remove-employee/:empID",
  passport.checkAuthentication,
  adminController.removeEmployee
);
router.post(
  "/assign-review/",
  passport.checkAuthentication,
  adminController.assignReview
);
router.post(
  "/create-review/",
  passport.checkAuthentication,
  adminController.createReview
);
router.post(
  "/delete-review/",
  passport.checkAuthentication,
  adminController.deleteReview
);

router.post("/makeAdmin/:empID", adminController.makeAdmin);
module.exports = router;
