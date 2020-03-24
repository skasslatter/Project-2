const express = require("express");
const app = express();

app.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});