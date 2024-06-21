const express = require("express");
const db = require("../../databaseConfig");
const isEmail = require("./validedEmail");

const router = express.Router();

router.post("/", (req, res) => {
  const { firstanme, lastname, email, password, tel, dateBirth, sexe } =
    req.body;

  if (!firstanme || !lastname || !email || !password || !dateBirth) {
    res.status(400).json({
      error: true,
      message: "Des champs obligatoires sont manquants.",
    });
  }
  if (!isEmail(email)) {
    res.status(400).json({
      error: true,
      message: "Le format de l'email est invalide.",
    });
  }
});

module.exports = router;
