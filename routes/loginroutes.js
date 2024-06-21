const express = require("express");
const router = express.Router();
const {
  getLogIn,
  postLogOut,
  getHome,
  postSignUp,
  postLogIn,
  getLogOut,
  getsignup,
} = require("../controller/loginController");

router.get("/", getLogIn);
router.post("/login", postLogIn);
router.get("/home", getHome);

router.get("/signup", getsignup);
router.post("/signup", postSignUp);

router.get("/logout", getLogOut);
router.post("/logout", postLogOut);

module.exports = router;
