const express = require("express");
const app = express();

app.get("/", (req,res)=> {
  res.render("fridge", {currentUser: req.session.currentUser});
});

module.exports = app;