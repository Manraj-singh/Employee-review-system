const passport = require("passport");
const router = require("express").Router();
const { employeeController } = require("../controllers");

const { employeeRegisterPrechecks } = require("../middlewares");

router.get(
  "/dashboard",
  passport.checkAuthentication,
  employeeController.viewDashboard
);

router.post(
  "/register",
  employeeRegisterPrechecks,
  employeeController.register
);

//NOTE:we have used passport local strategy so it authenticates checking in strategy which we configured that if user is present in db
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/signup" }),
  employeeController.login
);

router.post(
  "/submit-review",
  passport.checkAuthentication,
  employeeController.submitReview
);
module.exports = router;
