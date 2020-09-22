const mongoose = require("mongoose");
const schema = mongoose.Schema;

const logSchema = new schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  exercises: { type: [], required: true },
  date: { type: Date, required: true },
});

const exerciseLog = mongoose.model("Log", logSchema);
module.exports = exerciseLog;
