const mongoose = require("mongoose");

// Schema for habit
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

// creating a model for habit schema
const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
