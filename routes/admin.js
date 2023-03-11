const passport = require("passport");
const { adminController } = require("../controllers");
const router = require("express").Router();

//shows admin dashboard
router.get(
  "/dashboard",
  passport.checkAuthentication,
  adminController.adminDashboard
);

// ----------------------------------EMPLOYEE RELATED ROUTES with admin privilages--------------------------------------
//shows add employee page
router.get(
  "/add-employee",
  passport.checkAuthentication,
  adminController.addEmployee
);

//shows the edit employee page
router.get(
  "/edit-employee/:empID",
  passport.checkAuthentication,
  adminController.editEmployee
);

//post route to edit and update the employee details in mongoDB
router.post(
  "/edit-employee/:empID",
  passport.checkAuthentication,
  adminController.saveEditedEmployee
);
//for deleting the employee
router.post(
  "/remove-employee/:empID",
  passport.checkAuthentication,
  adminController.removeEmployee
);

// ----------------------------------REVIEWS RELATED ROUTES with admin priviliges--------------------------------------

//shows all the reviews to admin
router.get(
  "/all-reviews",
  passport.checkAuthentication,
  adminController.allReviews
);

//for assiginig employees to participate in reviews
router.post(
  "/assign-review/",
  passport.checkAuthentication,
  adminController.assignReview
);

//creating a review for employee
router.post(
  "/create-review/",
  passport.checkAuthentication,
  adminController.createReview
);
//deleting a review
router.post(
  "/delete-review/",
  passport.checkAuthentication,
  adminController.deleteReview
);

//route to admin priviliges to employee
router.post("/makeAdmin/:empID", adminController.makeAdmin);
module.exports = router;
