const express = require("express");
const app = express();
const Log = require("../models/log.model");
const User = require("../models/user.model");
const Exercise = require("../models/exercise.model");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const jsonParser = bodyParser.json();

app.get("/", jsonParser, function (req, res) {
  Log.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.get("/:id", jsonParser, function (req, res) {
  Log.findById({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/find", jsonParser, function (req, res) {
  Log.find({ username: req.query.username })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: ", err));
});

app.post("/create", jsonParser, function (req, res) {
  const username = req.body.username;
  const title = req.body.title;
  const desc = req.body.description;
  const date = Date.parse(req.body.date);

  const newLog = new Log({
    username: username,
    title: title,
    description: desc,
    date: date,
  });

  User.findOneAndUpdate(
    { username: username },
    {
      $push: { logId: mongoose.Types.ObjectId(newLog._id) },
    },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
  newLog
    .save()
    .then((log) => res.json(log))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/add/:id", jsonParser, function (req, res) {
  const newExercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    set: req.body.set,
    logId: mongoose.Types.ObjectId(req.params.id),
    reps: req.body.reps,
    weight: req.body.weight,
    date: new Date(),
  });
  Log.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { exercises: mongoose.Types.ObjectId(newExercise._id) },
    }
  )
    .then(() => {
      newExercise.save();
      res.json(newExercise);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

app.delete("/:id", jsonParser, (req, res) => {
  console.log("id:", req.params.id);
  console.log("Request", req);
  Log.findById({ _id: mongoose.Types.ObjectId(req.params.id) }).then((log) => {
    log.exercises.forEach((exercise) => {
      Exercise.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(exercise._id) },
        {
          set: [],
          reps: [],
          weight: [],
          $pull: { logId: req.params.id },
        }
      );
      log
        .delete()
        .then(() => {
          res.json("Log Deleted");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    });
  });
});
app.post("/update/:id", jsonParser, function (req, res) {
  Log.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      username: req.body.username,
      title: req.body.title,
      description: req.body.description,
      date: new Date(),
    },
    { new: true },
    function (err, result) {
      if (err) {
        console.log("ERROR", err);
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});
app.put("/delete/:id", jsonParser, function (req, res) {
  console.log("Exercise Id:", req.body.exerciseID);
  Log.find({
    exercises: {
      $in: [mongoose.Types.ObjectId(req.body.exerciseID)],
    },
  }).then((response) => {
    console.log("FOUND", response);
    Exercise.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.exerciseID) },
      {
        set: [],
        reps: [],
        weight: [],
        $pull: { logId: mongoose.Types.ObjectId(req.params.id) },
      },
      { new: true },
      function (error, updated) {
        if (error) {
          console.log("error:", error);
          res.json("Error: " + error);
        }
        if (updated) {
          Log.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $pull: {
                exercises: mongoose.Types.ObjectId(req.body.exerciseID),
              },
              date: new Date(),
            },
            { new: true },
            function (error, updated) {
              if (error) {
                console.log("error:", error);
                res.json("Error: " + error);
              }
              if (updated) {
                console.log("Response:", updated);
                res.json(updated);
              }
            }
          );
        }
      }
    ).catch((err) => {
      res.json("Error: " + err);
    });
  });
});
module.exports = app;
