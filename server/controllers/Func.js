const mongoose = require("mongoose");
const Driver = require("../models/Driver");
const User = require("../models/User");
const realtime = require("../socketJs");

const calculateRate = require("../utils").calcualteRate;

exports.FindNearByDriver = async (req, res, next) => {
  const long = req.body.long;
  const lat = req.body.lat;

  try {
    const docs = await Driver.find({
      location: {
        $near: {
          $maxDistance: 10000000,
          $geometry: { type: "Point", coordinates: [long, lat] },
        },
      },
    });

    if (!docs[0]) {
      return res.status(200).json({ success: true, driver: "not found" });
    }

    let rate = calculateRate(docs[0].rate);

    return res.status(200).json({
      success: true,
      driver: {
        id: docs[0]._id,
        name: docs[0].name,
        email: docs[0].email,
        phone: docs[0].phone,
        rate: rate,
        lat: docs[0].location.coordinates[0],
        lon: docs[0].location.coordinates[1],
      },
    });
  } catch (error) {
    console.log(error);
  }
}; // end of FindNearByDriver

exports.updateDriverLocation = async (req, res, next) => {
  console.log(req.body);

  const filter = { _id: mongoose.Types.ObjectId(req.body.driverID) };
  const update = {
    "location.coordinates": req.body.location,
  };

  try {
    const driver = await Driver.findOneAndUpdate(filter, update, {
      new: true,
    });
    return res.json({ success: "true", driver });
  } catch (error) {
    return res.json({ success: "false", error });
  }
};

exports.rateDriver = async (req, res, next) => {
  console.log(req.body);
  const userRate = +req.body.rate;

  try {
    const driver = await Driver.findOne({
      _id: mongoose.Types.ObjectId(req.body.driverID),
    });

    switch (userRate) {
      case 1:
        driver.rate[0] += 1;
        driver.rate.set(0, driver.rate[0]);
        await driver.save();
        break;
      case 2:
        driver.rate[1] += 1;
        driver.rate.set(1, driver.rate[1]);
        await driver.save();
        break;
      case 3:
        driver.rate[2] += 1;
        driver.rate.set(2, driver.rate[2]);
        await driver.save();
        break;
      case 4:
        driver.rate[3] += 1;
        driver.rate.set(3, driver.rate[3]);
        await driver.save();
        break;
      case 5:
        driver.rate[4] += 1;
        driver.rate.set(4, driver.rate[4]);
        await driver.save();
        break;
      default:
        console.log("No Value");
        break;
    }
    res.json({ status: "done" });
  } catch (error) {
    console.log(error);
  }
};

exports.orderDriver = async (req, res, next) => {
  const driverID = req.body.driverID;
  const clientID = req.body.clientID;
  const clientName = req.body.clientName;
  const clientLong = req.body.long;
  const clientLat = req.body.lat;

  const clientData = {
    clientName,
    clientID,
    clientLong,
    clientLat,
  };

  const connection = realtime.connection();
  const io = connection.returnIO();

  let DriverSocket;
  let ClientSocket;

  try {
    const driver = await Driver.findOne({
      _id: mongoose.Types.ObjectId(driverID),
    });

    // driver will recieve new order.
    io.sockets.in(driverID).emit("newOrder", clientData);

    DriverSocket = io.sockets.sockets.get(driver.socketID);

    DriverSocket.on("driverAnswer", async (msg) => {
      console.log(`driver accept${msg.answer}`); //1

      const user = await User.findOne({
        _id: mongoose.Types.ObjectId(clientID),
      });

      ClientSocket = io.sockets.sockets.get(user.socketID);

      if (msg.answer === 1) {
        ClientSocket.emit("driverDecision", true);

        DriverSocket.on("orderFinish", async (msg) => {
          ClientSocket.emit("tripFinished", true); // let client know the trip finished

          user.orders.push({ driverName: driver.name, clientName });
          driver.orders.push({ driverName: driver.name, clientName });

          try {
            await user.save();
            await driver.save();
          } catch (err) {
            console.log("err in pushing", err);
          }
          console.log("pushed orders");
        });
      } else {
        ClientSocket.emit("driverDecision", false);
      }
      return res.status(200).json({ state: "true" });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteDriver = async (req, res, next) => {
  const _id = req.body.id;

  try {
    const driver = await Driver.findByIdAndRemove(_id);
    if (!driver) res.state(404).json({ message: "driver not found" });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log("Driver removing Error");
  }
};

exports.getAllDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json({ message: true, data: drivers });
  } catch (error) {
    console.log("Drives collecting  Error");
  }
};
