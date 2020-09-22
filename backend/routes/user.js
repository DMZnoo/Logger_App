const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../models/user.model");
const Exercise = require("../models/exercise.model");
const Log = require("../models/log.model");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();

app.get("/", jsonParser, function (req, res) {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.post("/", jsonParser, function (req, res) {
  const username = req.body.username;
  User.exists({ username: username }, function (err, userExists) {
    if (err) {
      console.log(err);
    }
    if (userExists === false) {
      const newUser = new User({
        username: username,
      });
      newUser
        .save()
        .then(() => res.json("New User"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      User.find({ username: username }).then((user) => {
        Object.entries(user).forEach((el) => {
          if (el[1].logId.length === 0) res.json(0);
          else {
            Log.find({ username: el[1].username }).then((data) => {
              res.json(data);
            });
          }
        });
      });
    }
  });
});

app.post("/delete/:id", jsonParser, function (req, res) {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $pull: { logId: mongoose.Types.ObjectId(req.params.id) },
    },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        Log.findByIdAndDelete({ _id: req.params.id })
          .then(() => {
            res.json("Log Deleted");
          })
          .catch((err) => res.status(400).json("Error: " + err));
        console.log(result);
      }
    }
  );
});

module.exports = app;
