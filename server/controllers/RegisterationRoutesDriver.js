const Driver = require("../models/Driver");

const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const calculateRate = require("../utils").calcualteRate;

exports.register = (req, res, next) => {
  bycrpt
    .hash(req.body.password, 10)
    .then((hashed) => {
      req.body.password = hashed;

      const location = {
        type: "Point",
        coordinates: [0, 0],
      };

      const driver = new Driver({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        location: location,
      });

      driver
        .save()
        .then((driver) => {
          return res.status(200).json({
            success: true,
            id: driver._id,
            name: driver.name,
            email: driver.email,
          });
        })
        .catch((err) => {
          console.log("Error with user saving");
          console.log(err);
          return res.status(500).json({ success: false });
        });
    })
    .catch((err) => {
      console.log("Error with hashing");
      console.log(err);
      return res.status(500).json({ success: false });
    });
};

exports.logIn = (req, res, next) => {
  console.log(req.body, "Body");

  Driver.findOne({ email: req.body.email })
    .then((driver) => {
      if (!driver)
        return res.status(404).json({
          loginSuccess: false,
          message: "Auth failed, email not found",
        });

      bycrpt
        .compare(req.body.password, driver.password)
        .then((isMatch) => {
          if (!isMatch)
            return res
              .status(200)
              .json({ loginSuccess: false, message: "Wrong password" });

          let token = jwt.sign(
            driver._id.toHexString(),
            "SUPERSECRETPASSWORD123"
          );

          driver.token = token;

          driver
            .save()
            .then((driver) => {
              let rate = calculateRate(driver.rate);

              return res.status(200).json({
                loginSuccess: true,
                token,
                id: driver._id,
                name: driver.name,
                email: driver.email,
                phone: driver.phone,
                rate: rate,
                orders: driver.orders,
              });
            })
            .catch((err) => {
              return res.status(400).send({ err, message: "failed" });
            });
        })
        .catch((err) => {
          console.log("error while compairing passwords");
          console.log(err);
          return res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.log("Can't find email");
      console.log(err);
      return res.status(400).send(err);
    });
}; // end of logIn

exports.logOut = (req, res, next) => {
  Driver.findOneAndUpdate({ _id: req.driver._id }, { token: "" })
    .then((doc) => {
      return res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      console.log("Error while loging out");
      return res.json({ success: false, err });
    });
}; // end of logOut

exports.auth = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, "SUPERSECRETPASSWORD123", (err, decode) => {
    Driver.findOne({ _id: decode, token: token })
      .then((driver) => {
        if (!driver)
          return res.json({
            isAuth: false,
            error: "user not found",
          });

        req.token = token;
        req.driver = driver;
        next();
      })
      .catch((err) => {
        console.log("error while authing");
        console.log(err);
      });
  });
};

exports.authing = (req, res, next) => {
  res.status(200).json({
    isAuth: true,
    email: req.driver.email,
  });
}; // end of authing
