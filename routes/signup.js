const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  res.render("auth/signup.hbs");
});

app.post("/", (req, res) => {
  const { name, username, password } = req.body;
  User
  .findOne({ "username": username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "The username already exists!"
      });
      
    } else {
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) next("hashing error");
        else {
          User.create({
            name: name,
            username: username,
            password: hash
          })
            .then(user => {
              res.redirect("/login");
            })
            .catch(err => {
              res.send("user not created", err);
            });
        }
      });
    }
  })
  .catch(err => {
    res.send("user not created", err);
  });
});

module.exports = app;
