const express = require("express"); 
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 3000;

const path = require("path"); 
const expressLayout = require("express-ejs-layouts"); 
const ejs = require("ejs"); 
const db = require("./config/mongoose"); 


const app = express();
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use("/", require("./routes/index")); 
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
