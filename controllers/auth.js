const { response } = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const { generarJWT } = require("../helpers/jwt");

const register = async (req, res = response) => {
  const { email, password } = req.body;
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
      const token = await generarJWT(user.id, user.name);
      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await UserModel.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Correo no existe en nuestra base de datos",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Constrasena incorrecta",
      });
    }

    const token = await generarJWT(usuario.id, usuario.name);
    return res.status(200).json({
      ok: "true",
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

const renew = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);

  res.status(200).json({
    ok: "true",
    uid,
    name,
    token,
    msg: "revalidateToken",
  });
};

module.exports = {
  register,
  login,
  renew,
};
