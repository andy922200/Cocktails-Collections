const db = require('../models');
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let userController = {
  signIn: (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    User.findOne({
      where: { email: username },
    }).then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ status: "error", message: "No user was found." });

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ status: "error", message: "The password did not match." });
      }

      let payload = { id: user.id };
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({
        status: "success",
        message: "OK",
        token: token,
        isAuthenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isSponsor: user.isSponsor
        },
      });
    });
  },
  signUp: (req, res) => {
    if (req.body.password !== req.body.passwordCheck) {
      return res.json({
        status: "error",
        message: "Two Passwords do not match!",
      });
    }
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        return res.json({
          status: "error",
          message: "The email has already used!",
        });
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(
            req.body.password,
            bcrypt.genSaltSync(10),
            null
          ),
          role: 0,
          isSponsor:0
        }).then((user) => {
          return res.json({
            status: "success",
            message: "Register successfully!",
          });
        });
      }
    });
  },
  getCurrentUser: (req, res) => {
    // req.user is returned by passport-jwt
    const { user } = req

    let payload = { id: user.id };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({
      status: 'success',
      message: 'OK',
      token: token,
      isAuthenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isSponsor: user.isSponsor
      }
    })
  },
};

module.exports = userController;
