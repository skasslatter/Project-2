const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});


module.exports = app;
