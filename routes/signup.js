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
    } 
    else {
      if (checkPassword(password) !== true){
        //insert some errormessage here that will be shown 
        return
      } 
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

function checkPassword(str){
  // at least one number, one lowercase and one uppercase letter
  // at least 8 characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}   

module.exports = app;
