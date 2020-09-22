const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established");
});

const exerciseRouter = require("./routes/exercise");
const logRouter = require("./routes/log");
const userRouter = require("./routes/user");

app.use("/api/exercises", exerciseRouter);
app.use("/api/logs", logRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
