const express = require("express");
const router = express.Router();

router.get(`/base`, (req, res) => {
  res.status(200).render("base", { title: "Backpack" });
});
router.get(`/overview`, (req, res) => {
  res.status(200).render("overview", { title: "Backpack" });
});

module.exports = router;
