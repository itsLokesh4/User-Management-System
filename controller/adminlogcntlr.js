const adminCollection = require("../model/adm-mongo");
const collection = require("../model/mongodb");

const getadmLogIn = (req, res) => {
  try {
    if (req.session.isAdmLogged == true) {
      res.redirect("/admin-home");
    } else {
      res.render("admin/admin-log");
    }
  } catch (error) {
    console.log(error);
  }
};

const postadmLogOut = (req, res) => {
  try {
    if (req.session.admId) {
      res.redirect("/admin/admin-log");
    } else {
      res.render("admin/admin-log");
    }
  } catch (error) {
    console.log(error);
  }
};

const getadmHome = (req, res) => {
        try {
          if (req.session.isAdmLogged) {
            res.render("admin/admin-home")
          } else {
          res.redirect("/admin-log");
      } } catch (error) {
        console.log(error);
      }
};

const postadmLogIn = async (req, res) => {
  try {
    const admdtails = await adminCollection.findOne({ name: req.body.name });
    console.log(admdtails);
    if (admdtails.password == req.body.password) {
      req.session.admId = admdtails._id;
      req.session.isAdmLogged = true;
      req.session.save();
      res.redirect("/admin-home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong details");
  }
};

const getadmLogOut = (req, res) => {
  req.session.isAdmLogged = false;
  res.redirect("/admin-log");
};

const getadmDash = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    const fullUserData = await collection.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
    if (req.session.isAdmLogged) {
      res.render("admin/dashboard", { users: fullUserData });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};
const getCreateUser = (req, res) => {
  try {
    if (req.session.isAdmLogged) {
      res.render("admin/create-user");
    } else {
      res.redirect("/admin-log");
    }
  } catch (error) {
    console.log(error);
  }
};

const postCreateUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;

    const user = new collection({
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    });

    const userData = await user.save();

    if (userData) {
      res.redirect("/dashboard");
    } else {
      res.render("create-user", { message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getUserEdit = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await collection.findById({ _id: id });
    if (userData) {
      res.render("admin/edit-user", { user: userData });
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const postUserEdit = async (req, res) => {
  try {
    await collection.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
        },
      }
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

const getDeleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    await collection.deleteOne({ _id: id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getadmLogIn,
  postadmLogOut,
  getadmHome,
  postadmLogIn,
  getadmLogOut,
  getadmDash,
  getCreateUser,
  postCreateUser,
  getUserEdit,
  postUserEdit,
  getDeleteUser,
};
