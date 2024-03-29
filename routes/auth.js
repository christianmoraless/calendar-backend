const { Router } = require("express");
const { check } = require("express-validator");
const { register, login, renew } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email no puede estar vacio").not().isEmpty(),
    check("password", "Password no puede estar vacio").isLength({ min: 6 }),
    validarCampos,
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "Name no puede estar vacio").not().isEmpty(),
    check("email", "Email no puede estar vacio").not().isEmpty(),
    check("password", "Password no puede estar vacio").isLength({ min: 6 }),
    validarCampos,
  ],
  register
);

router.get("/renew", validarJWT, renew);

module.exports = router;
