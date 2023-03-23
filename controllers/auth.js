const { response } = require("express");
const bcrypt = require("bcriptjs");
const { validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");

const register = async (req, res = response) => {
  const { email, name, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    } else {
      const user = new UserModel(req.body);
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);
      await user.save();
      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

const login = (req, res = response) => {
  const { email, password } = req.body;
  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renew = (req, res = response) => {
  res.json({
    ok: true,
    msg: "revalidateToken",
    user: req.body,
  });
};

module.exports = {
  register,
  login,
  renew,
};
