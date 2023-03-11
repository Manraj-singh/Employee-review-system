const passport = require("passport");
const router = require("express").Router();
const { employeeController } = require("../controllers");

const { employeeRegisterPrechecks } = require("../middlewares");

//renders employee dashboard
router.get(
  "/dashboard",
  passport.checkAuthentication,
  employeeController.viewDashboard
);

//for registering employee , does prechecks in custom middle ware
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

//employee submiting a review which is assgned to employee
router.post(
  "/submit-review",
  passport.checkAuthentication,
  employeeController.submitReview
);
module.exports = router;
