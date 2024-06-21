const express = require("express");
const admrouter = express.Router();
const {
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
} = require("../controller/adminlogcntlr");

admrouter.get("/admin-log", getadmLogIn);
admrouter.post("/adminlogout", postadmLogOut);
admrouter.get("/admin-home", getadmHome);
// admrouter.post("/admin-sign-up",postadmSignUp);
admrouter.post("/admin-log", postadmLogIn);
admrouter.get("/adminlogout", getadmLogOut);
// admrouter.get("/admin-sign-up",getadmsignup);
admrouter.get("/dashboard", getadmDash);
admrouter.get("/create-user", getCreateUser);
admrouter.post("/create-user", postCreateUser);
admrouter.get("/edit-user", getUserEdit);
admrouter.post("/edit-user", postUserEdit);
admrouter.get("/delete-user", getDeleteUser);

module.exports = admrouter;
