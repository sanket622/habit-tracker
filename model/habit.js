const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    habitName: {
      type: String,
      required: true,
    },
    dates: [
      {
        date: String,
        complete: String,
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
