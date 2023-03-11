const { Employee, Review } = require("../models");
const mongoose = require("mongoose");

//For registering employee
module.exports.register = async function (req, res) {
  //*NOTE:all prechecks are done in middleware

  const { name, email, password, isAdmin = false } = req.body;

  //create user in DB
  try {
    const newEmployee = await Employee.create({
      name,
      email,
      password,
      isAdmin,
    });
    //if cannot create in db
    if (!newEmployee) {
      req.flash("error", "cannot register user , please try again");
      return res.redirect("/signup");
    }

    //else redirect to employee view page
    req.flash("success", "registration successfull , proceed to login");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "please try again");
    console.error("error while registering employee", err);
    return res.redirect("back");
  }
};

//creating as session and logging in , as authentication is done by passport
module.exports.login = async function (req, res) {
  req.flash("success", "Logged in successfully");
  if (req.user.isAdmin) {
    return res.redirect("/admin/dashboard");
  }
  // if user is not admin it will redirect to employee page
  return res.redirect(`/employee/dashboard`);
};

//destroying sesio and logginout
module.exports.logout = function (req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    return res.redirect("/signup");
  });
};

//renders employee dashboard
module.exports.viewDashboard = async function (req, res) {
  try {
    // populate all employees
    let employee = await Employee.findById(req.user._id).populate(
      "pendingReview"
    );

    let pending = employee.pendingReview.map((rev) => {
      return {
        recipientId: rev._id,
        recipientEmail: rev.email,
      };
    });
    return res.render("employee_view", {
      pendingReviews: pending,
    });
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};

//----------------------------------------REVIEW RELATED LOGIC----------------------------------------------------------------

module.exports.submitReview = async function (req, res) {
  const { reviewerID: reviewer, recipientID: recipient, review } = req.body;
  if (!(recipient && reviewer && review)) {
    req.flash("error", "please fill all details ");
    res.redirect("back");
  }
  try {
    //create review
    const newReview = await Review.create({ review, reviewer, recipient });
    if (!newReview) {
      req.flash("error", "error in creating review , please try again");
      return res.redirect("back");
    }
    //remove the pendingReview after submitting review
    const reviewerEmp = await Employee.findById(reviewer);
    const newPendingReview = reviewerEmp.pendingReview.filter((usr) => {
      if (`"${usr}"` !== `"${recipient}"`) {
        return usr;
      }
    });
    reviewerEmp.pendingReview = newPendingReview;
    await reviewerEmp.save();

    req.flash("success", "Review created ");
    return res.redirect("back");
  } catch (err) {
    console.error(err);
    req.flash(
      "error",
      "error in creating review , please fill all fields and try again"
    );
    return res.redirect("back");
  }
};
