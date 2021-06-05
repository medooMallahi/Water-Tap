const mongoose = require("mongoose");
const Driver = require("../models/Driver");
const User = require("../models/User");
const realtime = require("../socketJs");

exports.FindNearByDriver = (req, res, next) => {
  const long = req.body.long;
  const lat = req.body.lat;

  Driver.find({
    location: {
      $near: {
        $maxDistance: 10000,
        $geometry: { type: "Point", coordinates: [long, lat] },
      },
    },
  }).then((doc) => {
    if (!doc[0]) {
      return res.status(200).json({ success: true, driver: "not found" });
    }
    return res.status(200).json({ success: true, driver: doc });
  });
}; // end of FindNearByDriver

exports.updateDriverLocation = (req, res, next) => {
  const filter = { _id: mongoose.Types.ObjectId(req.body.driverID) };
  const update = {
    "location.coordinates": req.body.location,
  };

  Driver.findOneAndUpdate(filter, update, {
    new: true,
  })
    .then((driver) => {
      return res.json({ success: "true", driver });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: "false", err });
    });
};

exports.rateDriver = (req, res, next) => {
  return res.json({ driver: req.body });
};

exports.orderDriver = (req, res, next) => {
  const driverID = req.body.driverID;
  const clientID = req.body.clientID;
  const clientName = req.body.clientName;
  const clientLocation = req.body.clientLocation;

  const data = {
    clientName,
    clientID,
    clientLocation,
  };

  const connection = realtime.connection();

  const io = connection.returnIO();

  let DriverSocket;
  let ClientSocket;

  Driver.findOne({ _id: mongoose.Types.ObjectId(driverID) })
    .then((doc) => {
      DriverSocket = io.sockets.sockets.get(doc.socketID);

      // 1- driver recieve an order
      io.sockets.in(driverID).emit("newOrder", data);

      // 2- server recive the answer from the driver
      DriverSocket.on("driverAnswer", (msg) => {
        User.findOne({ _id: mongoose.Types.ObjectId(clientID) }).then((doc) => {
          ClientSocket = io.sockets.sockets.get(doc.socketID);
          // 3- analyze the answer and sent it back to client
          if (msg.answer === "yes") {
            ClientSocket.emit("driverDecision", "he's on his way to you");
          } else {
            ClientSocket.emit("driverDecision", "find someone else");
          }
        });
      });
    })

    .catch((err) => {
      console.log(err);
    });

  return res.status(200).json({ state: "true" });
};
