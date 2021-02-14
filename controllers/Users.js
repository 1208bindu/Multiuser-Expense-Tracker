const UserDetails = require("../models/Users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const msgEmail = require("../email/message");
const sendEmail = require("../email/send");
const templates = require("../email/templates");

// @desc    Get all Users
// @route   GET /api/v1/transactions
// @access  Public
exports.getUserDetails = async (req, res, next) => {
  try {
    const users = await UserDetails.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public

exports.forgotPwd = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log(email);

    const existingUser = await UserDetails.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      console.log("sending email");
      sendEmail(existingUser.email, templates.forgotPassword(existingUser._id))
        .then(() => res.status(200).json({ msg: msgEmail.forgotPassword }))
        .catch((err) => console.log(err));
    } else {
      res.status(400).json({
        msg: "Sorry, Provided Email - id is not registered.",
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addUserDetails = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await UserDetails.findOne({ email: email });

    if (!existingUser) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new UserDetails({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: passwordHash,
      });

      await newUser
        .save()
        .then((User) => sendEmail(User.email, templates.confirm(User._id)))
        .then(() => res.json({ msg: msgEmail.confirm }))
        .catch((err) => console.log(err));
    } else if (existingUser && !existingUser.confirmed) {
      sendEmail(
        existingUser.email,
        templates.confirm(existingUser._id)
      ).then(() => res.status(400).json({ msg: msgEmail.resend }));
    } else {
      res.status(400).json({
        msg:
          "An account with this email already exists. Enter your credentials to login",
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Change Password

exports.changePwd = async (req, res) => {
  const { id, password } = req.body;
  console.log(id);
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  await UserDetails.findById(id)
    .then((user) => {
      if (!user) {
        res.json({ msg: msgEmail.couldNotFind });
      } else {
        UserDetails.findByIdAndUpdate(id, { password: passwordHash })
          .then(() => res.json({ msg: "Change Success" }))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.confirmationEmail = (req, res) => {
  const { id } = req.params;
  console.log(id);
  UserDetails.findById(id)
    .then((user) => {
      if (!user) {
        res.json({ msg: msgEmail.couldNotFind });
      } else if (user && !user.confirmed) {
        UserDetails.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgEmail.confirmed }))
          .catch((err) => console.log(err));
      }

      // The user has already confirmed this email address.
      else {
        res.json({ msg: msgEmail.alreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
};

// Desc: User Login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    const user = await UserDetails.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    else if (user && user.confirmed) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });
      const token = jwt.sign({ id: user._id.toString() }, "have-a-great");
      res.status(200).json({
        token,
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    } else if (user && !user.confirmed) {
      sendEmail(user.email, templates.confirm(user._id)).then(() =>
        res.status(400).json({ msg: msgEmail.resend })
      );
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.isTokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, "have-a-great");
    if (!verified) return res.json(false);

    const user = await UserDetails.findById(verified.id);
    if (!user) return res.json(false);
    return res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
