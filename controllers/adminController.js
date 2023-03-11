const { Employee, Review } = require("../models");

module.exports.adminDashboard = async function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "you are not allowed to access this page");
    res.redirect("back");
  }
  try {
    // populate all employees
    let allEmployees = await Employee.find({});

    let filteredEmp = allEmployees.filter(
      (user) => user.email !== req.user.email
    );
    return res.render("admin_view", {
      employees: filteredEmp,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};
module.exports.addEmployee = function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "you are not allowed to access this page");
    res.redirec("back");
  }
  return res.render("add_employee");
};

module.exports.editEmployee = async function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "you are not allowed to access this page");
    res.redirec("back");
  }
  const { empID } = req.params;

  try {
    const employee = await Employee.findById(empID);
    if (!employee) {
      req.flash("error", "error ! please try again");
      return res.redirect("back");
    }

    // req.flash("success", "employee is now a admin");
    return res.render("edit_employee", {
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        isAdmin: employee.isAdmin,
      },
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
module.exports.saveEditedEmployee = async function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "you are not allowed to access this page");
    res.redirec("back");
  }
  const { empID } = req.params;
  const { name, email, password, confirmPassword, isAdmin = false } = req.body;
  if (password !== confirmPassword) {
    req.flash("error", "passwords do not match");
    return res.redirect("back");
  }

  try {
    const employee = await Employee.findById(empID);
    if (!employee) {
      req.flash("error", "error ! please try again");
      return res.redirect("back");
    }
    name ? (employee.name = name) : null;
    email ? (employee.email = email) : null;
    password ? (employee.password = password) : null;
    employee.isAdmin = isAdmin;

    await employee.save();
    req.flash("success", "employee details edited");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.makeAdmin = async function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "You are not a admin, only admin can make other admins");
    return res.redirect("back");
  }
  const { empID } = req.params;
  try {
    const employee = await Employee.findById(empID);
    if (!employee) {
      req.flash("error", "error ! please try again");
      return res.redirect("back");
    }

    employee.isAdmin = true;
    await employee.save();
    req.flash("success", "employee is now a admin");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.removeEmployee = async function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "you are not allowed to access this page");
    res.redirect("back");
  }

  const { empID } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(empID);
    console.log(employee);

    if (!employee) {
      req.flash("error", "error ! please try again");
      return res.redirect("back");
    }

    req.flash("success", "employee removed");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.allReviews = async function (req, res) {
  if (!req.user.isAdmin) {
    req.flash("error", "you are not allowed to access this page");
    res.redirec("back");
  }
  try {
    // populate all employees
    let allEmployees = await Employee.find({});
    let allReviews = await Review.find({})
      .populate("reviewer recipient")
      .sort({ createdAt: -1 });
    let filteredEmp = allEmployees.filter(
      (user) => user.email !== req.user.email
    );

    let filteredReviews = allReviews.map((rev) => {
      return {
        id: rev._id,
        message: rev.review,
        reviewer: {
          id: rev.reviewer._id,
          name: rev.reviewer.name,
          email: rev.reviewer.email,
        },
        recipient: {
          id: rev.recipient._id,
          name: rev.recipient.name,
          email: rev.recipient.email,
        },
      };
    });
    return res.render("performance_review", {
      employees: filteredEmp,
      reviews: filteredReviews,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.assignReview = async function (req, res) {
  const { reviewerID, reviewingFor } = req.body;
  if (!(reviewerID && reviewingFor)) {
    req.flash("error", "empty details provided");
    res.redirect("back");
  }
  try {
    const employee = await Employee.findById(reviewerID);
    if (!employee) {
      req.flash("error", "error ! please try again");
      return res.redirect("back");
    }

    await employee.pendingReview.push(reviewingFor);
    await employee.save();
    req.flash("success", "Review assigned ");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.createReview = async function (req, res) {
  const { reviewerID: reviewer, reviewingFor: recipient, review } = req.body;
  if (!(recipient && reviewer && review)) {
    req.flash("error", "please fill all details ");
    res.redirect("back");
  }
  try {
    const newReview = await Review.create({ review, reviewer, recipient });
    if (!newReview) {
      req.flash("error", "error in creating review , please try again");
      return res.redirect("back");
    }

    req.flash("success", "Review created ");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash(
      "error",
      "error in creating review , please fill all fields and try again"
    );
    return res.redirect("back");
  }
};

module.exports.deleteReview = async function (req, res) {
  const { reviewID } = req.body;

  try {
    const review = await Review.findByIdAndDelete(reviewID);
    if (!review) {
      req.flash("error", "error encountered , please try again");
      return res.redirect("back");
    }

    // req.flash("success", "Review created ");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error", "error encountered , please  try again");
    return res.redirect("back");
  }
};
