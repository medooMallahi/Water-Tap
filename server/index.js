const express = require("express");
const app = express();

const cors = require("cors");
const realtime = require("./socketJs");

const server = require("http").createServer(app);

const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

let mySocket;

// routes
const RegistrationRoute = require("./routes/Registration");
const DriverRoutes = require("./routes/DriverRoutes");
const UserRoutes = require("./routes/userRoutes");

app.use(RegistrationRoute);
app.use(DriverRoutes);
app.use(UserRoutes);

const mongoDbUrl =
  "mongodb+srv://medoo:0592413118@rlck.ifnzw.mongodb.net/Rlck?retryWrites=true&w=majority";

let PORT = process.env.PORT || 3001;

mongoose
  .connect(mongoDbUrl)
  .then((result) => {
    console.log("connected");

    realtime.connect(server);

    server.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch(() => {
    console.log("Error with connecting to DB");
  });
