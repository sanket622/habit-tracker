const mongoose = require("mongoose");
const MONGO_URI=process.env.MONGO_URI
const DB = mongoose.connect(MONGO_URI);
DB.then(() => {
    console.log('Connection successful!');
}).catch((err) => {
    console.log('No connection:', err);
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to DB"));
db.once("open", function(){
    console.log("Successfully connected to DB");
});

module.exports = db;
