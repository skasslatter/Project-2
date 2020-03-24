const express = require("express");
const app = express();

app.get("/", (req,res)=> {
  res.render("user/fridge", {currentUser: req.session.currentUser});
});

module.exports = app;