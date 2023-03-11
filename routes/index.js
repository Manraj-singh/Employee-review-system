const passport = require("passport");
const { employeeController } = require("../controllers");

const router = require("express").Router();

router.get("/", passport.checkAuthentication, (req, res) => {
  //if admin redirect to admin dashboard else to employee
  if (req.user.isAdmin) {
    return res.redirect("/admin/dashboard");
  } else {
    return res.redirect("/employee/dashboard");
  }
});

router.get("/signup", (req, res) => {
  return res.render("sign_in");
});

router.get("/logout", employeeController.logout);
router.use("/admin", require("./admin"));
router.use("/employee", require("./employee"));
module.exports = router;
