const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/habit_tracker")
  .then(() => console.log("Mongodb Connected"))
  .catch((e) => console.log(e));
  