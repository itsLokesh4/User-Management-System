const usercollection = require("../model/mongodb");

const getLogIn = (req, res) => {
  try {
    if (req.session.isLogged) {
      res.redirect("/home");
    } else {
      res.render("users/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const postLogOut = (req, res) => {
  try {
    if (req.session.userId) {
      res.redirect("/");
    } else {
      res.render("users/signup");
    }
  } catch (error) {
    console.log(error);
  }
};

const getHome = (req, res) => {
  try {
    if (req.session.isLogged == false) {
      res.redirect("/");
    } else {
      res.render("users/home");
    }
  } catch (error) {
    console.log(error);
  }
};

const postSignUp = async (req, res) => {

  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    };
    let user = new usercollection(data )
    await user.save()
    req.session.isLogged = true;
    res.redirect("/home");
  } catch (error) {
    console.log("Error during signup:", error);
  }
};

const postLogIn = async (req, res) => {
  try {
    const check = await usercollection.findOne({ name: req.body.name });
    console.log(check);
    if ( check.password == req.body.password) {
      req.session.userId = check._id;
      req.session.isLogged = true;
      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log("incorrect password or Username ", error);
  }
};

const getLogOut = (req, res) => {
  req.session.isLogged = false;
  res.redirect("/");
};

const getsignup = (req, res) => {
  if (req.session.isLogged) {
    res.render("users/home");
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  getLogIn,
  postLogOut,
  getHome,
  postSignUp,
  postLogIn,
  getLogOut,
  getsignup,
};
