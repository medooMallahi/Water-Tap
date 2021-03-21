const Driver = require("../models/Driver");

exports.FindNearByDriver = (req, res, next) => {
  const long = req.body.long;
  const lat = req.body.lat;

  Driver.find({
    location: {
      $near: {
        $maxDistance: 500,
        $geometry: { type: "Point", coordinates: [long, lat] },
      },
    },
  }).then((doc) => {
    if (!doc[0]) {
      return res.status(200).json({ success: true, driver: "not found" });
    }
    return res.status(200).json({ success: true, driver: doc[0] });
  });
}; // end of FindNearByDriver
