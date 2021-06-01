const mongoose = require("mongoose");
const Driver = require("../models/Driver");
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
    return res.status(200).json({
      success: true,
      driver: {
        driverID: doc[0]._id.toHexString(),
        name: doc[0].name,
        location: [
          doc[0].location.coordinates[0],
          doc[0].location.coordinates[1],
        ],
      },
    });
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
    clientLocation,
  };
  const connection = realtime.connection();

  connection.sendEventTo("newOrder", data, driverID);

  return res.status(200).json({ state: "true" });
};
