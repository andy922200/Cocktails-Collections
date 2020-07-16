const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const multer = require("multer");
const upload = multer();
const userController = require("../controller/userController");


// for authentication
const authenticated = passport.authenticate('jwt', { session: false })
const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role === 1) { return next() }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

// register, logIn, token validation
router.get(`/get_current_user`, authenticated, userController.getCurrentUser)
router.post("/signin", userController.signIn);
router.post("/signUp", userController.signUp);


module.exports = router;
