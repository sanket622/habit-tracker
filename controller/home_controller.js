const Habit = require("../model/habit");

function getTodayDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let today = day + "/" + month + "/" + year;
  return today;
}

function getOneWeekDate() {
  let arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let mm = d.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
    let dd = d.getDate();
    if (dd < 10) dd = "0" + dd;
    const yyyy = d.getFullYear();
    arr.push(dd + "/" + mm + "/" + yyyy);
  }
  return arr;
}

module.exports.load = async (request, response) => {
  try {
    const habits = await Habit.find({});
    return response.render("home", { habits: habits });
  } catch (err) {
    console.error("Error fetching habits from the database:", err);
  }
};

module.exports.add = async (request, response) => {
  try {
    const existingHabit = await Habit.findOne({
      habitName: request.body.habitName,
    });
    console.log(request.body);
    if (existingHabit) {
      return response.redirect("back");
    }
    request.body.dates = { date: getTodayDate(), complete: "none" };
    const newHabit = new Habit(request.body);
    await newHabit.save();

    return response.redirect("back");
  } catch (err) {
    console.error("Error creating a habit:", err);
  }
};

module.exports.delete = async (request, response) => {
  try {
    let id = request.query.id;
    await Habit.findByIdAndDelete(id);
    return response.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewhabit = async (request, response) => {
  try {
    let id = request.query.id;
    const habit = await Habit.find({ _id: id });
    response.render("habit.ejs", {
      habit: habit,
      weeklyDate: getOneWeekDate(),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.fetchhabit = async function (request, response) {
  try {
    let id = request.query.id;
    const habit = await Habit.findById(id);
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(habit));
  } catch (err) {
    console.error("Error finding the habit:", err);
  }
};

module.exports.updateDates = async (req, res) => {
  try {
    var d = req.query.date;
    var id = req.query.id;
    const habits = await Habit.findById(id);
    let dates = habits.dates;
    let found = false;
    dates.find((item, index) => {
      if (item.date === d) {
        if (item.complete === "yes") {
          item.complete = "no";
        } else if (item.complete === "no") {
          item.complete = "none";
        } else if (item.complete === "none") {
          item.complete = "yes";
        }
        found = true;
      }
    });
    if (!found) {
      dates.push({ date: d, complete: "yes" });
    }
    habits.dates = dates;
    habits
      .save()
      .then((habits) => {
        res.redirect("back");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("error insider updatesDate: " + error);
  }
};
