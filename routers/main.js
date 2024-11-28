const express = require("express");
const router = express.Router();

// Routers

router.get("/", (req, res) => {
  res.render('index',{user:req.session.user})
});

module.exports = router;
