const mongoose = require("mongoose");

const schema = mongoose.Schema;

const exerciseSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logId: { type: [] },
  set: { type: [] },
  reps: { type: [] },
  weight: { type: [] },
  date: { type: Date },
});

const exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = exercise;
