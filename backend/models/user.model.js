const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: { type: String, required: true },
  logId: { type: [] },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
