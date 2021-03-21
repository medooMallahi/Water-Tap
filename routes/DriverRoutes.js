const express = require("express");
const Router = express.Router();

const USerFuncs = require("../controllers/usersFunc");

Router.post("/api/users/findNearByDriver", USerFuncs.FindNearByDriver);
module.exports = Router;
