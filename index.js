const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const RegistrationRoute = require("./routes/Registration");
const HomePageRoute = require("./routes/HomePageRoute.js");
const DriverRoutes = require("./routes/DriverRoutes");

app.use(HomePageRoute);
app.use(RegistrationRoute);
app.use(DriverRoutes);

const mongoDbUrl =
  "mongodb+srv://medoo:0592413118@rlck.ifnzw.mongodb.net/Rlck?retryWrites=true&w=majority";

let PORT = process.env.PORT || 4000;

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("connected");
    const server = app.listen(PORT);
    const io = require("./socketJs").init(server);
  })
  .catch(() => {
    console.log("Error with connecting to DB");
  });

const connection = mongoose.connection;

connection.once("open", () => {
  let driverLocationsChangeStreams = connection.collection("drivers").watch();
  driverLocationsChangeStreams.on("change", (change) => {
    console.log("some changes occured");
    console.log(change.fullDocument);
    let io = require("./socketJs").getIO();
    io.emit("driverLocationChanging", change.fullDocument);
  });
});
connection.on("error", (error) => console.log("Error: " + error));
