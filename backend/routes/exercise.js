const express = require("express");
const app = express();
const Exercise = require("../models/exercise.model");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
app.get("/", function (req, res) {
  Exercise.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/create", jsonParser, function (req, res) {
  const name = req.body.name;
  const desc = req.body.description;

  const newExercise = new Exercise({
    name: name,
    description: desc,
    set: req.body.set,
    reps: req.body.reps,
    weight: req.body.weight,
    date: new Date(),
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/:id", function (req, res) {
  Exercise.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.delete("/:id", function (req, res) {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Exercise Deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/log/:id", function (req, res) {
  Exercise.find({ logId: mongoose.Types.ObjectId(req.params.id) })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("Error: ", err));
});

app.post("/update/:id", jsonParser, function (req, res) {
  Exercise.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      name: req.body.name,
      description: req.body.description,
      set: req.body.set,
      reps: req.body.reps,
      weight: req.body.weight,
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

module.exports = app;
